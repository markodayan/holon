import rascal from 'rascal';
import * as dotenv from 'dotenv';
dotenv.config();

const container_name = 'rabbitmq';

const config: rascal.BrokerConfig = {
  vhosts: {
    '/': {
      connection: {
        url: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${container_name}:5672`,
      },
      exchanges: ['ready-exchange'],
      queues: {
        'scraper-queue': {
          assert: true,
          options: { durable: true },
        },
        'core-queue': {
          assert: true,
          options: { durable: true },
        },
        'api-queue': {
          assert: true,
          options: { durable: true },
        },
      },
      bindings: [
        'ready-exchange[scraper] -> scraper-queue',
        'ready-exchange[core] -> core-queue',
        'ready-exchange[api] -> api-queue',
      ],
      publications: {
        scraper_ready: {
          exchange: 'ready-exchange',
          routingKey: 'scraper',
          options: {
            persistent: true,
          },
        },
        core_ready: {
          exchange: 'ready-exchange',
          routingKey: 'core',
          options: {
            persistent: true,
          },
        },
        api_ready: {
          exchange: 'ready-exchange',
          routingKey: 'api',
          options: {
            persistent: true,
          },
        },
      },
      subscriptions: {
        scraper_ready: {
          queue: 'scraper-queue',
        },
        core_ready: {
          queue: 'core-queue',
        },
        api_ready: {
          queue: 'api-queue',
        },
      },
    },
  },
};

export { config };
