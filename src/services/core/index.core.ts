import * as dotenv from 'dotenv';
dotenv.config();

import { CoreClient } from '@core/singleton/client.core';
import Broker from '@rabbitmq/broker';
import { fetchHostIP } from '@core/utils';
import { initDataStores } from '@db/index';
import { Cache } from '@cache/index.cache';
import { waitForPort } from 'src/utils/ports.utils';

const host = fetchHostIP();

// keeps the service alive
setInterval(() => {}, 1 << 30);

async function run() {
  const service_name = process.env.SERVICE_NAME;
  const rabbit_wrapper = new Broker();
  await initDataStores();

  Cache.getInstance();
  
  const rabbit_host = process.env.RABBITMQ_HOST || '0.0.0.0';
  await waitForPort(5672, rabbit_host);


  try {
    await rabbit_wrapper.init();
    const { broker } = rabbit_wrapper;
    const subscription = await broker.subscribe('scraper_ready');

    subscription.on('message', async (message, content, ackOrNack) => {
      console.log(`[${service_name}] received ${content}`);
      await broker.publish(`${service_name}_ready`, service_name, { routingKey: service_name });

      process.on('exit', (code) => {
        console.log(`[${service_name}] About to exit with code: ${code}`);
      });

      CoreClient.init(`ws://${host}:5000/eth`);

      ackOrNack();
    });
  } catch (err: any) {
    console.log(`[${service_name}] top-level error (broker-related likely)`);
  }
}
run().then();
