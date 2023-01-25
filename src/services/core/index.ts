import * as dotenv from 'dotenv';
dotenv.config();
import { CoreClient } from '@core/singleton/client';
import { fetchHostIP } from '@core/utils';

// keeps the service alive
setInterval(() => {}, 1 << 30);

import { initDB } from '@core/config/db';

initDB().then(() => {
  const host = fetchHostIP();

  CoreClient.init(`ws://${host}:5000/eth`);
});
