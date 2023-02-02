# Client Settings

There are various parameters that the client should have control of configuring of which the service is able to apply and function reliably thereafter.

It is the responsibility of the service to validate whether the configuration options provided by the user are valid and acceptable within the tolerances of the service functionality. Therefore the service will have validation responsibilities to ensure the user has a good experience such as:

- <b>Server-side and client-side parameter validation</b>
- <b>Assessing appropriate port assignment </b>
- <b>Checking host dependencies:</b>
  - Is Docker installed on the host?
  - Is there a functional full node on the host?
- <b>Asserting valid paths were provided in path parameter fields</b>
- <b>Asserting Docker engine has sufficient resources to run the service</b>
- <b>Asserting the host machine has sufficient resources to manage the service</b>
- <b>Graceful handling of down-time and recovery processes</b>

## Client Setting Options (in detail)

The following options will be available to configure via the client:

- <b>Host label name (the host machine will establish a local networking namespace which the multi-container system will use for cross-service communication)</b>
- <b>Configurable PostgreSQL user name, password, database name</b>
- <b>Absolute path configuration for PostgreSQL volume on host machine</b>
- <b>Port numbers to assign to Redis (cache) and PostgreSQL server (db) as well as the exposed services running in application containers</b>
- <b>Scraper preferences:</b>
  - Constraint preferences for on-chain interactions
- <b>Cache and database administration</b>
- <b>Cache and database pruning</b>
- <b>Destination directories for batch jobs (specific seeder requests)</b>
