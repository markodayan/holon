import { DataSource } from 'typeorm';

import { Receipt, Transaction } from '@core/entities/index.entities';
import { Cache } from '@core/singleton/cache';

const initDataStores = async () => {
  try {
    const connection = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', // 'db' (host name for postgres container)
      username: process.env.USER_NAME,
      password: process.env.PG_PASS,
      database: process.env.DATABASE_NAME,
      entities: [Receipt, Transaction],
      synchronize: true,
    });

    await connection.initialize();
    console.log('[core] Connected to Postgres');
    const cache = Cache.getInstance();

    await new Promise((resolve) => {
      while (!cache.isOpen) {
        console.log('[core] Redis connection not open yet');
      }

      resolve(cache);
    });
  } catch (err) {
    console.error(err);
    throw new Error('[core] Unable to connect to db');
  }
};

export { initDataStores };
