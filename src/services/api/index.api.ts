import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import { Cache } from '@cache/index.cache';
import { initDataStores } from '@db/index';
import router from '@api/routes/routes.api';

const cache = Cache.getInstance();

async function startup() {
  await initDataStores();

  cache.subscribe('core-ready', handleMessage);
}

function handleMessage(message: string, channel: string) {
  console.log(`[${process.env.SERVICE_NAME}] channel: ${channel} subscriber message: ${message}`);
  if (message === 'Ready') {
    run();
  }
}

async function run() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', router);

  const PORT = 8001; // mapped to 5001

  app.listen(PORT, () => {
    console.log(`[${process.env.SERVICE_NAME}] running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

startup();
