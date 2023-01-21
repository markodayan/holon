module.exports = {
  apps: [
    {
      name: 'scraper',
      script: './dist/services/scraper/index.js',
      watch: false,
      node_args: '-r ts-node/register/transpile-only -r tsconfig-paths/register ./dist/services/scraper/index.js',
      env: {
        PORT: '5000',
        NODE_ENV: 'production',
        JSON_RPC_HTTP: 'http://localhost:8545',
        JSON_RPC_WS: 'ws://localhost:8546',
      },
    },
    {
      name: 'core',
      script: './dist/services/core/index.js',
      watch: false,
      node_args: '-r ts-node/register/transpile-only -r tsconfig-paths/register ./dist/services/core/index.js',
      env: {
        PORT: '5001',
        NODE_ENV: 'production',
        JSON_RPC_HTTP: 'http://localhost:8545',
        JSON_RPC_WS: 'ws://localhost:8546',
      },
    },
  ],
};
