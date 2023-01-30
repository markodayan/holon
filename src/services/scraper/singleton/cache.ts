import { RedisClientType } from '@redis/client/dist/lib/client';
import { createClient } from 'redis';

class Cache {
  private static instance: Cache;
  private client: RedisClientType;
  private port: number = 6379;
  private host: string = process.env.CACHE_HOST as string;

  public static getInstance(): RedisClientType {
    if (!this.instance) {
      this.instance = new Cache();
    }

    return this.instance.client;
  }

  private constructor() {
    this.client = createClient({
      socket: {
        host: this.host,
        port: this.port,
      },
    });

    this.client.connect();

    this.client.on('connect', () => {
      console.log(`[scraper] Redis connected to ${this.host}:${this.port}`);
    });

    this.client.on('error', (err) => {
      console.error(`[scraper] Redis error: ${err}`);
    });
  }
}

export { Cache };
