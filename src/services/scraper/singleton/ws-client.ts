import WebSocket from 'ws';
import { Provider, utils } from 'noob-ethereum';
import { WSS } from './ws-server';

/**
 * JSON-RPC WS client listening to the Ethereum full node for new header events
 */
class NodeClient {
  private static instance: NodeClient;
  private ws: WebSocket; // JSON-RPC WS provider link to full node
  public provider: Provider; // JSON-RPC HTTP provider link to full node
  public wss: WebSocket.Server; // Custom WebSockets server to deliver messages to other microservices

  public prev: number;
  public latest: number;

  private ping(_ws: WebSocket) {}

  public static init(http_url: string, ws_url: string): WebSocket {
    if (!this.instance) {
      this.instance = new NodeClient(http_url, ws_url);
    }

    return this.instance.ws;
  }

  private constructor(http_url: string, ws_url: string) {
    this.provider = Provider.init(http_url);
    this.initWS(ws_url);
    this.wss = WSS.init();
  }

  private initWS(url: string) {
    this.ws = new WebSocket(url);
    this.prev = Date.now();

    this.ws.on('open', () => {
      console.log(`Node client WS connection opened`);
      this.ws.send('{"jsonrpc":"2.0","method":"eth_subscribe","params":["newHeads"], "id":1}');
    });

    this.ws.on('close', () => {
      console.error(`Node client websocket closing...`);
    });

    this.ws.on('error', (err) => {
      console.error(`Error with node client webosckets connection`, err);
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

        this.wss.clients.forEach((ws: WebSocket) => {
          if (ws.readyState === WebSocket.OPEN) {
            /* TODO: At this point we will fire off the message handler to prepare whatever data we are about to broadcast to clients */
            // sendClientMessage(ws: WebSocket)
            ws.send(JSON.stringify(raw));
          }

          // @ts-ignore // ws types error
          ws.isAlive = false;
          ws.ping(() => {
            this.ping(ws);
          });
        });
      }
    });

    console.log(`Node client WS connection initialised...`);
  }
}

export { NodeClient };
