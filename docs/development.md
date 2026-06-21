# Development Guide

This guide is for contributors working on the app locally.

## Prerequisites

- Bun
- A Turso/libSQL database
- Environment variables for database access and Better Auth

## Setup

Install dependencies:

```sh
bun install
```

Create a `.env` file:

```sh
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
BETTER_AUTH_URL=
```

Run the development server:

```sh
bun run dev
```

## Common Commands

```sh
bun run dev
bun run build
bun run start
bun run typecheck
```

- `dev`: starts the React Router development server.
- `build`: builds the app for production.
- `start`: serves the built server bundle from `build/server/index.js`.
- `typecheck`: generates React Router types and runs TypeScript.

## Adding a Route

1. Add a route module under `app/routes/`.
2. Register it in `app/routes.ts`.
3. Use a loader for server reads and an action for server mutations.
4. Keep route-specific UI near the route unless it is reusable elsewhere.

React Router type generation runs as part of `bun run typecheck`.

## Working with Auth

Use `auth.api.getSession({ headers: request.headers })` in loaders and actions
that require a signed-in user.

Do not trust client-provided user IDs. Use the authenticated session user when
querying or mutating user-owned data.

Client-side login, signup, and sign-out flows should go through
`app/lib/auth-client.ts`.

OAuth buttons may appear in the login and signup screens, but OAuth providers
are not wired up yet. Treat email/password as the supported auth flow until the
backlog item for OAuth is implemented.

## Working with Tasks

The task list is loaded in `/tasks`, and mutations are routed through
`/action/tasks`.

When adding task features:

- Keep the session check in the server action or loader.
- Scope reads and writes to `session.user.id` where the task belongs to a user.
  For task updates and deletes, filter by both `task.id` and `task.userId`.
- Update the Drizzle schema and create a migration if the database shape
  changes.
- Prefer React Router loaders/actions over ad hoc client fetch code for route
  data.

Current task UI supports creating tasks, marking them complete or incomplete,
and deleting them. Completed tasks render in a collapsible section. The edit
menu item, deadlines, and subtasks are not implemented in the UI yet.

## UI Components

Reusable primitives live in `app/components/ui/`. Keep these components generic.
Route-specific components can stay in their route module until they are reused
in more than one place.

Use the existing Tailwind and shadcn-style component patterns when adding UI.
