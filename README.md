### Add packages

To install a npm package to a specific workspace, run

```bash
yarn workspace <workspace_name> add <package_name>
```

### Environments

### Server

DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"

### Product-web

---

### Start server

You can up postgres local or use docker-compose.yml located in "server" workspace
To run docker file, run

```bash
yarn run:docker-up
```
