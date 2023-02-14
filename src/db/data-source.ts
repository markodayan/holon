import { DataSource } from 'typeorm';
import * as entities from '@db/entities/index.entities';

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost', // 'db' (host name for postgres container)
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  // entities: [...Object.values(entities)],
  entities: [entities.Transaction, entities.Account, entities.Flow, entities.Rollup],
  synchronize: true,
});

export default PostgresDataSource;
