# URS (Untitled Rollup Service) Backend Subsystem

> This is a sub-component of an on-going project called <b>Untitled Rollup Service</b>. [See here for more details!](https://hackmd.io/O93wObfUS0af7nhLv0EW5A)

Two services running alongside one another in a shared docker container, these services are:

- `scraper`
- `core`

The `scraper` communicates directly with an Ethereum execution client to stream incoming block header data as well as being capable of performing historical blockchain queries. This service drives the activity of the `core` service. The `core` service receives data from the `scraper` service, applies processing and updates persistant and caching data stores to serve the API and presentation layers of URS.

## Development

This repository is described as the Untitled Rollup Service backend subsystem consisting of 2 networked containers, one holding the 2 services described above and another instantiating a PostgreSQL database with a custom volume mount to the host machine.

Start the containers and networking with:

```bash
docker compose up -d
```

> If you are going to iterate on the code running in the backend container (consisting of `scraper` and `core` PM2 services), you should remove the previously created images prior to running compose to restart the containers. else just run `docker compose up -d --build`

To stop the containers, run:

```bash
docker compose down
```
