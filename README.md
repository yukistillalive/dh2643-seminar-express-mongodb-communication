# Express + MongoDB Communication Demo

A minimal Express API backed by MongoDB, with a static frontend. Demonstrates
a basic three-tier setup: frontend, backend, and database each run as
independent containers.

## Structure

```
.
├── Dockerfile          # backend image
├── docker-compose.yml  # frontend + backend + dedicated MongoDB container
├── db.js               # MongoDB connection
├── index.js            # Express app: routes and handlers
├── .env                # MongoDB URI, port (used outside Docker)
└── frontend/           # static HTML/CSS/JS, calls the API via fetch()
```

## Prerequisites

- Docker Desktop

## Run

```bash
docker compose up --build
```

- Frontend: `http://localhost:5500`
- API: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27018`
Stop with `docker compose down` (add `-v` to also delete the data volume).

## API

| Method | Path             | Description            |
|--------|------------------|-------------------------|
| POST   | `/api/rooms`     | Create a room           |
| GET    | `/api/rooms`     | List all rooms          |
| GET    | `/api/rooms/:id` | Get a room by id        |
| PUT    | `/api/rooms/:id` | Rename a room           |
| DELETE | `/api/rooms/:id` | Delete a room           |

## Inspecting the database

Or connect MongoDB Compass (Add-on in VS Code) to `mongodb://localhost:27018`.
