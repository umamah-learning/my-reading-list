# My Reading List

## Setup

```bash
npm install
```

## Database Initialization (macOS)

1. Make sure SQLite is available (default on macOS).
2. Create the `data` directory and initialize the database:

```bash
mkdir -p data
sqlite3 ./data/reading-list.db < ./data/schema.sql
```

## Run the Development Server

```bash
npm run dev
```

## Features

- View, Add, Toggle Read Status, and Delete books
- Backend: Nuxt 3 Server API using SQLite
- Frontend: Nuxt UI components
