# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Install [Docker](https://docs.docker.com/engine/install/)

## Downloading

```
git clone https://github.com/emp74ark/nodejs2022Q4-service
```

## Switch to task branch

```
git checkout dev_p2
```

## Docker

### Docker hub:

```bash
docker compose --env-file .env -f docker-compose.yml up -d
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

For dev after docker images started run prisma migration script **manually**:
```bash
 npx prisma migrate dev --name init
```

If needed change necessary variables in **.env** and recreate images.

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
