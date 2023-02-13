import WebSocket, { Server } from 'ws';

/**
 * WebSocket Server that will broadcast to Worker and API application clients
 */
class WSS {
  private static instance: WSS;
  private server: Server;
  public subscribers: number;

  public heartbeat(ws: any) {
    ws.isAlive = true;
  }

  public static init(): Server {
    if (!this.instance) {
      this.instance = new WSS();
    }

    return this.instance.server;
  }

  private constructor() {
    this.subscribers = 0;
    this.server = new WebSocket.Server({ noServer: true });

    this.server.on('connection', (ws: WebSocket & { isAlive: boolean }) => {
      ws.isAlive = true;

      ws.on('pong', () => {
        this.heartbeat(ws);
      });

      this.subscribers++;
      console.log(`${this.subscribers} subscriber/s`);

      ws.on('close', () => {
        this.subscribers--;
        console.log(`Connection dropped; now ${this.subscribers} subscriber/s`);
      });
    });
  }
}

export { WSS };
