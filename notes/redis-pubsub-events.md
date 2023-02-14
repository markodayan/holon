# Redis Pub/Sub events

## Channels

- `scraper-ready` (emits a 'Ready' message)
- `core-ready` (emits a 'Ready' message)
- `db-ready` (emits a 'Ready' message)
- `cache-ready` (emits a 'Ready' message)

### Scraper published events

Scraper publishes the 'Ready' message over the `scraper-ready` channel at:

- `@scraper/singleton/client.scraper.ts`. It is important that the Scraper service has instantiated a connection with the Ethereum full node so that it may be ready to broadcast WebSocket server messages to the Core service.
- The flow is simply (Ethereum [raw JSON-RPC responses] -> Scraper [Processing applied] -> Core [Sanitised data ready for DB writes and caching])

### Core published events

Core publishes the 'Ready' message over the `core-ready` channel at:

- `@core/singleton/client.core.ts` in the websocket client on event listener. the reason for this is because we need to client connection to the websocket server to be instantiated so that we now the Core service has everything it needs to operate.
