import { createServer } from 'http';
import schedule from 'node-schedule';
import { parse } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

/* PostgreSQL connection method */
import { initDataStores } from '@db/index';

/* Singletons */
import { NodeClient } from '@scraper/singleton/client.scraper';
import { WSS } from '@scraper/singleton/server.scraper';
import Broker from '@rabbitmq/broker';

import { app } from '@scraper/app.scraper';
import { fetchJSONRPCDetails } from '@scraper/utils';
import { waitForPort } from 'src/utils/ports.utils';

/* Optimism seeding */
import { EOA_MAP, CONTRACT_MAP, RELATIONSHIPS } from 'src/seeder/optimism';
import * as optimism from '@db/seeders/optimism.seeder';

async function run() {
  const service_name = process.env.SERVICE_NAME;
  const PORT = process.env.SERVICE_PORT;

  await initDataStores();
  const { http_url, ws_url } = fetchJSONRPCDetails();
  // Instantiate broker
  const rabbit_wrapper = new Broker();
  // Wait for RabbitMQ server to be up and running
  const rabbit_host = process.env.RABBITMQ_HOST || '0.0.0.0';
  await waitForPort(5672, rabbit_host);

  /* Seed data */
  if (process.env.SEED === 'yes') {
    try {
      await optimism.seed(EOA_MAP, CONTRACT_MAP, RELATIONSHIPS);
    } catch (err) {
      console.log('Already seeded');
    }
  }

  try {
    /* Initialisations */
    const node = NodeClient.init(http_url as string, ws_url as string);
    const wss = WSS.init();
    await rabbit_wrapper.init();
    const { broker } = rabbit_wrapper;

    let options = {};
    const server = createServer(options, app);

    // Execute every minute
    schedule.scheduleJob(`*/1 * * * *`, async () => {
      // Check execution client subscription is not hanging
      node.checkProvider();
    });

    server.on('upgrade', function (request, socket, head) {
      const { pathname } = parse(request.url as string);
      if (pathname === '/eth') {
        wss.handleUpgrade(request, socket as never, head, function done(ws) {
          wss.emit('connection', ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    setInterval(() => {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: 'ping' }));
      });
    }, 60000); // testing 60 seconds

    server.listen(PORT, async () => {
      console.log(`[${service_name}] running in ${process.env.NODE_ENV} mode on port ${PORT}!`);
      await broker.publish(`${service_name}_ready`, service_name, { routingKey: service_name });
    });

    process.on('SIGINT', function () {
      server.close((err) => {
        process.exit(err ? 1 : 0);
      });
    });
  } catch (err: any) {
    console.log(`[${service_name}] top-level error (broker-related likely)`);
  }
}

run().then();
