import * as dotenv from 'dotenv';
dotenv.config();

import { CoreClient } from '@core/singleton/client.core';
import { fetchHostIP } from '@core/utils';
import * as optimism from '@db/seeders/optimism.seeder';
import { initDataStores, waitForService } from '@db/index';
import { EOA_MAP, CONTRACT_MAP, RELATIONSHIPS } from 'src/seeder/optimism';
import { Account } from '@db/entities/index.entities';

import * as account from '@db/controllers/account.controller';
import * as flow from '@db/controllers/flow.controller';

const host = fetchHostIP();

// keeps the service alive
setInterval(() => {}, 1 << 30);

async function run() {
  /* Wait for database and cache servers to start up */
  await initDataStores();
  /* Give the scraper websocket server time to initialise */
  await waitForService(5000);

  CoreClient.init(`ws://${host}:5000/eth`);
}

run().then();
