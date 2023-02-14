# Failure and Resilience

- Graceful handling of database or cache server failures in their respective containers [Healing].
- Graceful handling of single service in Engine container (`scraper`, `core`, `api`) [Healing]
- Graceful handling of multi-service failure in Engine container (more than one of the above `scraper`, `core`, `api` services) [Healing]
- System resources exceed threshold [Termination]
- Loss of Redis server or PostgreSQL [Healing with implementation of circuit breakers]

## Intermittent Connection to Ethereum Node

> The service only really relies on local connectivity to an Ethereum execution client, but if that Execution Client is no longer synced with Ethereum, the scraper service will not be able to deliver messages to the core service. <b>While this is by no means a catastrophic system failure, it means we will have to try establish a new connection to the Ethereum Node (and keep trying with reasonable retry logic until the client connection is re-established)</b>.

- It would be important to implement reasonable retry logic with a agreed upon value for:
  - timeout
  - delay retry interval
  - retry attempts

## Loss of Redis server

- Each service needs to check if Redis is available for two reasons:
  1. Caching for API and querying performance
  2. Pub-Sub inter-service messaging

> Without Redis, the messaging between multiple of the services in the Engine Container will not be able to know whether a service has experienced failure or entered a stage that drives a piece of event-driven behaviour. <b>Therefore it is important that the health of Redis is continuously monitored to ensure the integrity of the pub/sub system are intact.</b>

- Without connection to the Redis or PostgreSQL server/s, the `core` service in Engine container should refrain from attempting writes to the database. The same goes for any attempted caching.

## System resources consumed above threshold

- In the case of system resource usage by the service reaching an unsustainable level, the entire service must exit gracefully without intention of restarting. The logs should express the seriousness of this action taken and why the service was terminated.
  - This is just an additional layer of application management to detect and terminate the entire service if its resource usage accelerates in an uncharacteristic manner allowing for graceful termination instead of hitting a critical run-time exception.
