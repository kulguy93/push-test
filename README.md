#Push test service

## Description

A simple push service via Firebase Messaging API.

## Configuration
Before running the app you should set these environment variables
### Required env variables
* DB_URL - URL for postgres connection. Example: postgres://login:password@host:port/database
* FIREBASE_CREDENTIALS_PATH - absolute path for firebase credentials JSON (private_key, client_id, client_email etc.). You should download the file from Firebase Console before running this service
* API_KEY - some API key to perform authenticated requests to the service

### Optional env variables
* PORT - set this to use different port for running the service

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Build the docker container for an app
```bash
$ npm run build
$ docker build -t push-test-service
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
