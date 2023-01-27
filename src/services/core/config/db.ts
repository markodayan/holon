import { DataSource } from 'typeorm';

import { Receipt, Transaction } from '@core/entities/index.entities';
const initDB = async () => {
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
    console.log('Connected to Postgres');
  } catch (err) {
    console.error(err);
    throw new Error('Unable to connect to db');
  }
};

export { initDB };
