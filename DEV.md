# Development

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
