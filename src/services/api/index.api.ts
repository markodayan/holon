import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import router from '@api/routes/routes.api';

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

run().then();
