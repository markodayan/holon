/**
 * If you are running in development mode, make sure you add JSON-RPC credentials to a .env file so that the environment variables are recorded by PM2
 */

require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'core',
      script: './src/services/core/index.ts',
      watch: false,
      interpreter: './node_modules/.bin/ts-node',
      node_args: '-r tsconfig-paths/register ./src/services/core/index.ts',
      env: {
        PORT: '5001',
        NODE_ENV: 'development',
        JSON_RPC_HTTP: process.env.JSON_RPC_HTTP,
        JSON_RPC_WS: process.env.JSON_RPC_WS,
        USER_NAME: process.env.USER_NAME,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DB_HOST: 'db',
      },
    },
    {
      name: 'scraper',
      script: './src/services/scraper/index.ts',
      watch: false,
      interpreter: './node_modules/.bin/ts-node',
      node_args: '-r tsconfig-paths/register ./src/services/scraper/index.ts',
      env: {
        PORT: '5000',
        NODE_ENV: 'development',
        JSON_RPC_HTTP: process.env.JSON_RPC_HTTP,
        JSON_RPC_WS: process.env.JSON_RPC_WS,
        DB_HOST: 'db',
      },
    },
  ],
};
