import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import { initDataStores } from '@db/index';
import router from '@api/routes/routes.api';
import Broker from '@rabbitmq/broker';
import { Cache } from '@cache/index.cache';
import { waitForPort } from 'src/utils/ports.utils';

async function run() {
  const service_name = process.env.SERVICE_NAME;
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', router);

  Cache.getInstance();

  const PORT = process.env.SERVICE_PORT;

  const rabbit_wrapper = new Broker();
  await waitForPort(5672);
  await initDataStores();

  try {
    await rabbit_wrapper.init();
    const { broker } = rabbit_wrapper;
    const subscription = await broker.subscribe('core_ready');

    subscription.on('message', async (message, content, ackOrNack) => {
      console.log(`[${service_name}] received ${content}`);

      app.listen(PORT, async () => {
        /* When app is ready, publish ready message */
        await broker.publish(`${service_name}_ready`, service_name, { routingKey: service_name });
      });

      process.on('exit', (code) => {
        console.log(`[${service_name}] About to exit with code: ${code}`);
      });

      ackOrNack();
    });
  } catch (err: any) {
    console.log(`[${service_name}] top-level error (broker-related likely)`);
  }
}

run().then();
