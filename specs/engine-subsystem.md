# Holon Backend Subsystem

> This is a sub-component of an on-going project called <b>Holon</b>. [See here for more details!](https://hackmd.io/O93wObfUS0af7nhLv0EW5A)

Two services running alongside one another in a shared docker container, these services are:

- `scraper`
- `core`

The `scraper` communicates directly with an Ethereum execution client to stream incoming block header data as well as being capable of performing historical blockchain queries. This service drives the activity of the `core` service. The `core` service receives data from the `scraper` service, applies processing and updates persistant and caching data stores to serve the API and presentation layers of Holon.

## Pre-requisites

Prior to doing any changes, make sure you have the following on your machine:

- Docker
- Ethereum execution client (e.g. Geth)

> A working execution client will need a consensus client to successfully sync with Ethereum, so it goes without saying that it will be required, though Holon does not interact with the consensus client.

<br>

### 1. Change JSON-RPC interface address from localhost to 0.0.0.0

An Ethereum full node is required to be running on the same machine as this service. Usually the execution client of Ethereum exposes the JSON-RPC interface over localhost port 8545 and port 8546 (for WebSockets).

<br>

> <b>In order for Holon to work, you are required to change the address of the execution client from localhost to `0.0.0.0`.</b> This therefore means that the JSON-RPC HTTP interface is accessible on http://0.0.0.0/8545 , while the JSON-RPC WS interface is accessible on `ws://0.0.0.0/8546`

<br>

The reason for this change being needed is to do with networking between Docker containers used with this service that need to communicate with services on the host machine and issues created with using the 'localhost' keyword.

<br>

### 2. Create .env file and populate information

Firstly, create a `.env` file in your project directory:

```bash
touch .env
```

In the root directory you will find a `.prod.env` file, copy the contents into the `.env` file:

```bash
HOST_LABEL=node

# PostgreSQL environment variables
USER_NAME=postgres
DATABASE_NAME=holon_test
PG_PASS=postgres

# Docker environment variables
DB_HOST_PATH=
DB_CONTAINER_PATH=/var/lib/postgresql/data

```

Specify a `DB_HOST_PATH` value of your choice (this is important else Docker will create an anonymous volume in a default docker directory). For example you could specify a path like -> `/home/<user-name-here>/Documents/holon/data`

## Running the service

All you need to do is run the following command once you have cloned the repository:

```bash
npm run compose
```
