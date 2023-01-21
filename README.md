# URS (Untitled Rollup Service) Backend Subsystem

Two services running alongside one another in a shared docker container, these services are:

- `scraper`
- `core`

The `scraper` communicates directly with an Ethereum execution client to stream incoming block header data as well as being capable of performing historical blockchain queries. This service drives the activity of the `core` service. The `core` service receives data from the `scraper` service, applies processing and updates persistant and caching data stores to serve the API and presentation layers of URS.
