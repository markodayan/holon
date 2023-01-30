import * as dotenv from 'dotenv';
dotenv.config();
import { CoreClient } from '@core/singleton/client';
import { fetchHostIP } from '@core/utils';
import { Cache } from '@core/singleton/cache';
import { initDB } from '@core/config/db';

// keeps the service alive
setInterval(() => {}, 1 << 30);

initDB().then(() => {
  const host = fetchHostIP();
  const cache = Cache.getInstance();

  CoreClient.init(`ws://${host}:5000/eth`);
});
