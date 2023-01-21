import { DataSource } from 'typeorm';

import { Receipt } from '@core/entities/index.entities';

const initDB = async () => {
  try {
    const connection = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USER_NAME,
      password: undefined,
      database: process.env.DATABASE_NAME,
      entities: [Receipt],
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
