# Holon

> Holon is a software service geared towards collecting and processing L1 block to data to produce insights about rollup activity on Ethereum. It is designed to run alongside an Ethereum full node.

## Links

- [HackMD Notes (as part of Ethereum Protocol Fellowship final update)](https://hackmd.io/mDOVIKk2Sfeb2kbXORs_kQ?both)
- [Holon presentation (16 Min)](https://www.youtube.com/watch?v=m94kB8SxO4U)

Below you can see a system diagram of Holon and how it functions on a computer hosting an Ethereum full node (specifically interfacing with an execution client like Geth):

<div style='display: flex; justify-content: center;'>
<image src='https://storage.googleapis.com/rollup-research/holon-arch-2.png'>
</div>

<br>

# User Features Available

The following features are currently available to the user (accessible over an application API via HTTP routes):

- Fetch an account (by address or designated label)
- Fetch all flows associated with an account (query by account address)
- Fetch all transactions corresponding to a flow (by flow id)

## What is a flow?

<b>A flow describes a transaction interaction involving an address</b>. It can describe conditions such as:

- Address A sending transaction to Address B (A -> B)
- Address B sending transaction to Address A (B -> A)
- Address A and Address B bidirection transactions (both the above conditions) [A <-> B]
- Address A sending a transaction to any address (A -> \*)
- Any address sending a transaction to Address A (\* -> A)

> Later changes will involve more nuanced flows such as a specific type of transaction interaction occuring such as a specific contract call made to a destination address or Ether transfer made to specific address (these events will leverage contract ABIs and log events produced and available from transaction receipts)

<br>

# Pre-requisites

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

```yaml
# Your host machine's network across which the service will run
HOST_LABEL=node

# PostgreSQL environment variables
USER_NAME=postgres
DATABASE_NAME=holon_db
PG_PASS=postgres

# Docker environment variables
DB_HOST_PATH=<enter desired path on machine>
DB_CONTAINER_PATH=/var/lib/postgresql/data

# Host Names (Containers)
DB_HOST=db
CACHE_HOST=cache

```

Specify a `DB_HOST_PATH` value of your choice (this is important else Docker will create an anonymous volume in a default docker directory). For example you could specify a path like -> `/home/<user-name-here>/Documents/holon/data`

## Running the service

All you need to do is run the following command once you have cloned the repository:

```bash
npm run compose
```
