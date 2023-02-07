import * as dotenv from 'dotenv';
dotenv.config();

import { CoreClient } from '@core/singleton/client';
import { fetchHostIP } from '@core/utils';
import * as optimism from '@db/seeders/optimism.seeder';
import { initDataStores } from '@db/index';
import { EOA_MAP, CONTRACT_MAP, RELATIONSHIPS } from 'src/seeder/optimism';

const host = fetchHostIP();

// keeps the service alive
setInterval(() => {}, 1 << 30);

/* Give the scraper websocket server time to initialise */
setTimeout(async () => {
  await initDataStores();
  CoreClient.init(`ws://${host}:5000/eth`);

  try {
    await optimism.seed(EOA_MAP, CONTRACT_MAP, RELATIONSHIPS);
  } catch (err) {
    console.log('Already seeded');
  }
}, 5000);
