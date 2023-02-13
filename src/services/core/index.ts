import * as dotenv from 'dotenv';
dotenv.config();

import { CoreClient } from '@core/singleton/client.core';
import { fetchHostIP } from '@core/utils';
import { initDataStores, waitForService } from '@db/index';

const host = fetchHostIP();

// keeps the service alive
setInterval(() => {}, 1 << 30);

async function run() {
  /* Wait for database and cache servers to start up */
  await initDataStores();
  /* Give the scraper websocket server time to initialise */
  await waitForService(5000);

  // Temporary solution until figure out graceful handling of websocket client wait for server to be ready
  setTimeout(() => {
    CoreClient.init(`ws://${host}:5000/eth`);
  }, 5000);
}

run().then();
