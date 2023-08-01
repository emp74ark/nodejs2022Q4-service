# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/emp74ark/nodejs2022Q4-service
```

## Switch to task branch

```
git checkout dev_p2
```

## Installing NPM modules

```
npm install
```

## Running application
Rename file **.env.example** to **.env** and change necessary variables.

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:{{PORT}}/doc/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Docker

### Docker hub:
```bash
docker compose --env-file .env -f docker-compose.yml up -d
```
Or pull images separately:

```bash
docker pull emp74ark/rs-library-prod-backend:latest
docker pull emp74ark/rs-library-prod-postgres:latest
```
#### Start/stop docker containers

```bash
docker compose -f docker-compose.yml start
```

```bash
docker compose -f docker-compose.yml stop
```

All commands for build/up local containers should run in app directory (_nodejs2022Q4-service_ by default)

### Local production environment

```bash
docker compose --env-file .env -f docker-compose.prod.yml up -d
```

#### Start/stop docker containers

```bash
docker compose -f docker-compose.prod.yml start
```

```bash
docker compose -f docker-compose.prod.yml stop
```

### Local development environment

```bash
docker compose --env-file .env -f docker-compose.dev.yml up -d
```
#### Start/stop docker containers

```bash
docker compose -f docker-compose.dev.yml start
```

```bash
docker compose -f docker-compose.dev.yml stop
```

### Docker logs

```bash
docker logs --follow {contaier_name}
```
