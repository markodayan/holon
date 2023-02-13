import WebSocket from 'ws';

import * as transaction from '@db/controllers/transaction.controller';

class CoreClient {
  private static instance: CoreClient;
  private ws: WebSocket; // websocket client connection to scraper websockets server

  public static init(ws_url: string): CoreClient {
    if (!this.instance) {
      this.instance = new CoreClient(ws_url);
    }

    return this.instance;
  }

  private constructor(ws_url: string) {
    this.initWS(ws_url);
  }

  public initWS(url: string) {
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      console.log(`[core] Core client WS connection opened`);
    });

    this.ws.on('close', () => {
      console.error(`[core] Core client websocket closing...`);
    });

    this.ws.on('message', async (res: string) => {
      const message = JSON.parse(res);

      console.log(message);

      // if (Array.isArray(message)) {
      //   console.log('[core] message received from scraper at ', new Date());
      // }

      if (message?.type === 'transactions') {
        console.log(`[core] transaction message received`);
        await Promise.all(message.data.map((tx: TransactionBody) => transaction.create(tx)));
      }
    });

    console.log(`[core] Core client WS connection initialised...`);
  }
}

export { CoreClient };
