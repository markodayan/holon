# Development

Start the containers and networking with:

```bash
npm run compose
```

> If you are going to iterate on the code running in the backend container (consisting of `scraper` and `core` PM2 services), you should remove the previously created images prior to running compose to restart the containers. else just run `docker compose up -d --build`

To stop the containers, run:

```bash
docker compose down
```
