import { createServer } from 'http';
import schedule from 'node-schedule';
import { parse } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

/* PostgreSQL connection method */
import { initDataStores } from '@db/index';

/* Singletons */
import { NodeClient } from '@scraper/singleton/ws-client';
import { WSS } from '@scraper/singleton/ws-server';

import { app } from '@scraper/app';
import { fetchJSONRPCDetails } from '@scraper/utils';

const { http_url, ws_url } = fetchJSONRPCDetails();

/* Initialisations */
initDataStores().then(() => {
  const node = NodeClient.init(http_url as string, ws_url as string);
  const wss = WSS.init();

  const PORT = 8000;

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

  server.listen(PORT, () => {
    console.log(`[scraper] Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`);
  });

  process.on('SIGINT', function () {
    server.close((err) => {
      process.exit(err ? 1 : 0);
    });
  });
});
