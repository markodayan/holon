import WebSocket from 'ws';
import { Provider, utils, RLP as rlp } from 'noob-ethereum';
import { WSS } from '@scraper/singleton/server.scraper';
import { fetchJSONRPCDetails, parseBlockTransactions } from '@scraper/utils';
import { Flow, Transaction } from '@db/entities/index.entities';
import { Cache } from '@cache/index.cache';
import { RedisClientType } from '@redis/client';

interface FilteredTxMap {
  id: string;
  hash: string;
}

/**
 * JSON-RPC WS client listening to the Ethereum full node for new header events
 */
class NodeClient {
  private static instance: NodeClient;
  private ws: WebSocket; // JSON-RPC WS provider link to full node
  private cache: RedisClientType; // Redis client instance
  public provider: Provider; // JSON-RPC HTTP provider link to full node
  public wss: WebSocket.Server; // Custom WebSockets server to deliver messages to other microservices
  // public flows: Flow[]; // the interactions that will be scanned for
  public flows: any[] = [];

  public prev: number;
  public latest: number;

  private ping(_ws: WebSocket) {}

  public static init(http_url: string, ws_url: string): NodeClient {
    if (!this.instance) {
      this.instance = new NodeClient(http_url, ws_url);
    }

    return this.instance;
  }

  private constructor(http_url: string, ws_url: string) {
    this.cache = Cache.getInstance();
    this.provider = Provider.init(http_url);
    this.initWS(ws_url);
    this.wss = WSS.init();

    this.cacheFlows();
  }

  public async initWS(url: string) {
    this.ws = new WebSocket(url);
    this.prev = Date.now();

    this.ws.on('open', () => {
      console.log(`[scraper] Ethereum client WS connection established`);
      this.ws.send('{"jsonrpc":"2.0","method":"eth_subscribe","params":["newHeads"], "id":1}');
    });

    this.ws.on('close', () => {
      console.error(`[scraper] Ethereum client WS connection closing...`);
    });

    this.ws.on('error', (err) => {
      console.error(`[scraper] Error with Ethereum client WS connection`, err);
    });

    this.ws.on('message', async (res: string) => {
      this.latest = Date.now();

      const data = JSON.parse(res);
      const diff = this.latest - this.prev;
      this.prev = this.latest;

      // New block head update detected
      if (data?.method) {
        // Fetch latest block body corresponding to block header received from full node ws connection
        const raw = await this.provider.getLatestBlock(true);
        const transactions = await parseBlockTransactions(raw.transactions as RawTransactionBody[]);

        this.wss.clients.forEach((ws: WebSocket) => {
          if (ws.readyState === WebSocket.OPEN) {
            console.log('[scraper] message received from Ethereum at ', new Date());
            let filtered = this.searchTransactions(transactions);
            console.log(
              'filtered:',
              filtered.reduce((acc: any[], v: any) => {
                return [...acc, { hash: v.hash, flow: v.flow.id }];
              }, [])
            );
            let payload = JSON.stringify({ data: filtered, type: 'transactions' });
            ws.send(payload);
          }

          // @ts-ignore // ws types error
          ws.isAlive = false;
          ws.ping(() => {
            this.ping(ws);
          });
        });
      }
    });

    console.log(`[scraper] Scraper client WS connection initialised...`);
  }

  /* Over a block of transactions, check for each flow */
  private searchTransactions(transactions: TransactionBody[]): TransactionBody[] {
    let result: any = [];

    // Flow rows are cached and hence able to be appended to transaction bodies for writing to db
    this.flows.forEach((flow) => {
      let id = flow.id;
      let src_addr = JSON.parse(flow.from).address;
      let dest_addr = JSON.parse(flow.to).address;

      // result = [
      //   ...result,
      //   ...transactions
      //     .filter((tx: TransactionBody) => tx.from === src_addr && tx.to === dest_addr)
      //     .map((t: TransactionBody) => ({
      //       id,
      //       hash: t.hash,
      //     })),
      // ];
      result = [
        ...result,
        ...transactions
          .filter((tx: TransactionBody) => tx.from === src_addr && tx.to === dest_addr)
          .map((t: TransactionBody) => ({
            ...t,
            flow,
          })),
      ];
    });

    return result;
  }

  /* TODO: cache the flow rows collected  */
  /* TODO: update wss message format to distinguish what transaction is being sent to 'core' via WebSockets  */
  /* TODO: request receipt for tx body that satisfies flow constraint */
  public async cacheFlows() {
    try {
      const flows: Flow[] = await Flow.createQueryBuilder('flow')
        .leftJoinAndSelect('flow.from', 'from')
        .leftJoinAndSelect('flow.to', 'to')
        .getMany();

      for (const f of flows) {
        let key = `${f.from.label}:${f.to.label}`;

        let from = JSON.stringify({
          address: f.from.address,
          label: f.from.label,
          description: f.from.description,
          is_contract: f.from.is_contract,
        });

        let to = JSON.stringify({
          address: f.to.address,
          label: f.to.label,
          description: f.to.description,
          is_contract: f.to.is_contract,
        });

        let value = JSON.stringify({
          from,
          to,
        });

        await this.cache.set(key, value);

        this.flows = [
          ...this.flows,
          {
            id: f.id,
            from,
            to,
          },
        ];
      }

      let keys = await this.cache.keys('*');
      console.log('keys', keys);
    } catch (err) {
      console.error(err);
      throw new Error('[scraper] cacheFlows() error');
    }
  }

  public checkProvider() {
    const check = Date.now() - this.prev;

    // 2 minutes set for now (120 000), adjust to (60 000)
    if (this.ws && check > 60000) {
      console.log(`[scraper] Time since last block update received: ${check} ms | ${utils.minutes(check)} minutes`);
      console.log(`[scraper] Ethereum client WS connection hanging. Reinitialising Ethereum client WS connection...`);
      this.ws.close();

      const { http_url, ws_url } = fetchJSONRPCDetails();

      this.initWS(ws_url as string);
    }
  }
}

export { NodeClient };
