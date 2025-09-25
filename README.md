# Chat app

A practice project to explore front-end and back-end development. Not maintained.

## Installation

Make sure Docker is installed.

First, run the database:
```
docker compose --env-file ./back-end/.env up
```

To run back-end tests:
```
cd back-end && npm run test
```

## Technical stack

### Front-end:

- Next.js

Components librairies used:
- [Shadcn](https://ui.shadcn.com/)
- [Shadcn-chat](https://github.com/jakobhoeg/shadcn-chat)
- [Shadcn Extension](https://shadcn-extension.vercel.app/)

### Back-end:

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/docs/orm)
- [PostgreSQL](https://www.postgresql.org/) database in a [Docker](https://www.docker.com/) container