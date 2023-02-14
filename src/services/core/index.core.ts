import * as dotenv from 'dotenv';
dotenv.config();

import { CoreClient } from '@core/singleton/client.core';
import { fetchHostIP } from '@core/utils';
import { initDataStores } from '@db/index';
import { Cache } from '@cache/index.cache';

const host = fetchHostIP();
const cache = Cache.getInstance();

// keeps the service alive
setInterval(() => {}, 1 << 30);

async function startup() {
  await initDataStores();

  cache.subscribe('scraper-ready', handleMessage);
}

function handleMessage(message: string, channel: string) {
  console.log(`[${process.env.SERVICE_NAME}] channel: ${channel} subscriber message: ${message}`);
  if (message === 'Ready') {
    run();
  }
}

function run() {
  CoreClient.init(`ws://${host}:5000/eth`);
  cache.unsubscribe('scraper-ready', handleMessage);
}

startup();
