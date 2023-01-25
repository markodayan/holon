# URS (Untitled Rollup Service) Backend Subsystem

> This is a sub-component of an on-going project called <b>Untitled Rollup Service</b>. [See here for more details!](https://hackmd.io/O93wObfUS0af7nhLv0EW5A)

Two services running alongside one another in a shared docker container, these services are:

- `scraper`
- `core`

The `scraper` communicates directly with an Ethereum execution client to stream incoming block header data as well as being capable of performing historical blockchain queries. This service drives the activity of the `core` service. The `core` service receives data from the `scraper` service, applies processing and updates persistant and caching data stores to serve the API and presentation layers of URS.

## Pre-requisites

An Ethereum full node is required to be running on the same machine as this service. Usually the execution client of Ethereum exposes the JSON-RPC interface over localhost port 8545 and port 8546 (for WebSockets).

<br>

> <b>In order for URS to work, you are required to change the address of the execution client from localhost to `0.0.0.0`.</b>

<br>

The reason for this change being needed is to do with networking between Docker containers used with this service that need to communicate with services on the host machine and issues created with using the 'localhost' keyword.

## Running the service

All you need to do is run the following command once you have cloned the repository:

```bash
npm run compose
```
