import { DataSource } from 'typeorm';
import { check } from 'tcp-port-used';

import * as entities from '@db/entities/index.entities';
import { Cache } from '@cache/index.cache';

const initDataStores = async () => {
  const service = process.env.SERVICE_NAME || 'UNDEFINED';

  try {
    const connection = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', // 'db' (host name for postgres container)
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      // entities: [...Object.values(entities)],
      entities: [entities.Transaction, entities.Account, entities.Flow, entities.Rollup],
      synchronize: true,
    });

    await waitForService(5432); // PostgreSQL server
    await waitForService(6379); // Redis server

    await connection.initialize();
    console.log(`[${service}] Connected to Postgres`);

    const cache = Cache.getInstance();

    return connection;
  } catch (err) {
    console.error(err);
    throw new Error(`[${service}] Unable to connect to db`);
  }
};

async function waitForService(port_num: number) {
  const PORT_LABEL_MAP: IPortMap = {
    5432: 'Postgres',
    6379: 'redis-server',
    5000: 'scraper',
  };

  while (!(await isReady(port_num))) {
    await timeout(1000, PORT_LABEL_MAP[port_num]);
  }
}

function timeout(ms: number, label: string) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`[${label}] ${ms} ms elapsed`);
      resolve(true);
    }, ms)
  );
}

async function isReady(port_num: number) {
  try {
    const inUse = await check(port_num, process.env.HOST_IP_ADDR);
    return inUse;
  } catch (err) {
    console.error(err);
    throw new Error('unexpected error');
  }
}

export { initDataStores, waitForService };
