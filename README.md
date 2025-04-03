## Install dependencies

```bash
yarn
```

### Add packages

To install a npm package to a specific workspace, run

```bash
yarn workspace <workspace_name> add <package_name>
```

### Environments

### Server

DATABASE_URL=postgresql://user:password@localhost:5432/db?schema=public
PORT=3000

RABBIT_MQ_URI=amqp://rmuser:rmpassword@localhost:5672
RABBIT_MQ_PRODUCTS_QUEUE=products_queue

### Products-web

NEXT_PUBLIC_SERVER_URL=http://localhost:3000/

### Product-web-consumer

NEXT_PUBLIC_SSE_PRODUCTS_URL=http://localhost:3000/events/sse
NEXT_PUBLIC_SERVER_URL=http://localhost:3000/

### Start server

This project uses PostgreSQL.

You can up postgres local or use docker-compose.yml located in "server" workspace
To run docker file, run

```bash
yarn run run:docker-postgres-up
```

After that apply database migrations and regenerate prisma types:

```bash "SERVER DIRECTORY"
npx prisma migrate dev # (or `prisma migrate deploy` on production)
npx prisma generate
```

Then start rabbitmq contaier, run

```bash
yarn run run:docker-rabbitmq-up
```

Then you can run the server

```bash
yarn run run:server
```

### Start Products-web

No additional preparation required

```bash
yarn run run:products-web
```

### Start Products-web-consumer

No additional preparation required

```bash
yarn run run:products-web-consumer
```
