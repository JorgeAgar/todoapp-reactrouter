# Todo App React Router

A small todo application built with React Router, Better Auth, Drizzle ORM,
and Turso/libSQL. The app currently supports email/password authentication and
authenticated task management.

This project is not ready for real use yet. See [TODO.md](TODO.md) for the
current feature backlog.

## Tech Stack

- React Router 7 and React 19 for routes, loaders, actions, and UI
- Better Auth for authentication
- Drizzle ORM with Turso/libSQL for persistence
- Tailwind CSS and shadcn-style UI primitives for styling
- Bun for dependency management and scripts

## Quick Start

Install dependencies:

```sh
bun install
```

Create a `.env` file with the required variables:

```sh
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
BETTER_AUTH_URL=
```

Start the development server:

```sh
bun run dev
```

## Useful Commands

```sh
bun install
bun run dev
bun run build
bun run start
bun run typecheck
```

## Documentation

- [Project structure](docs/project-structure.md)
- [Architecture](docs/architecture.md)
- [Development guide](docs/development.md)
- [Database](docs/database.md)
