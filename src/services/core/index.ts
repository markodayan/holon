import * as dotenv from 'dotenv';
dotenv.config();

// keeps the service alive
setInterval(() => {}, 1 << 30);

import { initDB } from '@core/config/db';

initDB();
