import { DataSource } from 'typeorm';

import * as entities from '@db/entities/index.entities';
import { Cache } from '@core/singleton/cache';

const initDataStores = async () => {
  try {
    const connection = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', // 'db' (host name for postgres container)
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      entities: [...Object.values(entities)],
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
