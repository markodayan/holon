/**
 * If you are running in development mode, make sure you add JSON-RPC credentials to a .env file so that the environment variables are recorded by PM2
 */

require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'scraper',
      script: './src/services/scraper/index.scraper.ts',
      watch: false,
      interpreter: './node_modules/.bin/ts-node',
      node_args: '-r tsconfig-paths/register ./src/services/scraper/index.scraper.ts',
      env: {
        SERVICE_NAME: 'scraper',
        SERVICE_PORT: '5000',
        NODE_ENV: 'development',
        JSON_RPC_HTTP: process.env.JSON_RPC_HTTP,
        JSON_RPC_WS: process.env.JSON_RPC_WS,
        DB_HOST: process.env.DB_HOST || 'db',
        CACHE_HOST: process.env.CACHE_HOST || 'cache',
      },
      max_restarts: 10,
      restart_delay: 5000,
    },
    {
      name: 'core',
      script: './src/services/core/index.core.ts',
      watch: false,
      interpreter: './node_modules/.bin/ts-node',
      node_args: '-r tsconfig-paths/register ./src/services/core/index.core.ts',
      env: {
        SERVICE_NAME: 'core',
        SERVICE_PORT: '5001',
        NODE_ENV: 'development',
        JSON_RPC_HTTP: process.env.JSON_RPC_HTTP,
        JSON_RPC_WS: process.env.JSON_RPC_WS,
        USER_NAME: process.env.USER_NAME,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DB_HOST: process.env.DB_HOST || 'db',
        CACHE_HOST: process.env.CACHE_HOST || 'cache',
      },
      max_restarts: 10,
      restart_delay: 5000,
    },
    {
      name: 'api',
      script: './src/services/api/index.api.ts',
      watch: false,
      interpreter: './node_modules/.bin/ts-node',
      node_args: '-r tsconfig-paths/register ./src/services/api/index.api.ts',
      env: {
        SERVICE_NAME: 'api',
        SERVICE_PORT: '5002',
        NODE_ENV: 'development',
        DB_HOST: process.env.DB_HOST || 'db',
        CACHE_HOST: process.env.CACHE_HOST || 'cache',
      },
      max_restarts: 10,
      restart_delay: 5000,
    },
  ],
};
