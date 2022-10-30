# PayHippo TODO List Backend

OpenAPI documentation for this API is available at `/docs` when this backend is running (by default at [http://localhost:8080/docs]).

## Installation and setup

These instructions assume you already have `docker`, `npm`, and `node` v16 installed.


### With Docker
```bash
docker-compose up --build -d
```

### Without Docker

#### Create an `.env` file

Create an `.env` file in the root directory and add:

```bash
NODE_ENV=development
PORT=8080

DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=public
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=todo

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}
```


#### Install packages and initialize the database

```bash
npm install
npx prisma migrate dev
```

### Run the backend

```bash
# development
npm run dev

# production mode
npm run build && npm start
```

### Tests

```bash
npm run test
```
