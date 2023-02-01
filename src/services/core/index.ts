import * as dotenv from 'dotenv';
dotenv.config();

import { CoreClient } from '@core/singleton/client';
import { fetchHostIP } from '@core/utils';

const host = fetchHostIP();

// keeps the service alive
setInterval(() => {}, 1 << 30);
CoreClient.init(`ws://${host}:5000/eth`);
