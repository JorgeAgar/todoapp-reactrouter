# Architecture

This app uses React Router framework routes for UI rendering, server loaders,
and server actions. Authenticated data access flows through Better Auth and
Drizzle ORM before reaching Turso/libSQL.

## Request Flow

Most application requests follow this path:

```txt
Browser -> React Router route -> loader/action -> auth/session check -> Drizzle -> Turso/libSQL
```

Page routes render React components. Routes that need server data use loaders.
Mutations use route actions.

## Route Map

Routes are declared in `app/routes.ts`.

- `/`: home page.
- `/tasks`: authenticated task list page.
- `/login`: login page.
- `/signup`: signup page.
- `/action/tasks`: task mutation endpoint.
- `/api/auth/*`: Better Auth catch-all endpoint.

## Authentication

Server auth is configured in `app/lib/auth.ts` with Better Auth, the Drizzle
adapter, SQLite provider settings, cookie caching, and email/password auth.

Client auth helpers are created in `app/lib/auth-client.ts` with
`createAuthClient`.

The `/api/auth/*` route is handled by `app/routes/auth-catcher.ts`, which passes
loader and action requests to `auth.handler(request)`.

## Protected Task Flow

The `/tasks` loader checks the current session with Better Auth. If there is no
session, it redirects to `/login`. If a session exists, it queries tasks for the
current user with Drizzle and returns them to the route component.

Task mutations are handled by `/action/tasks`:

- `POST`: creates a task for the authenticated user.
- `PATCH`: updates completion state.
- `DELETE`: deletes a task.

The action endpoint checks the session before applying any mutation. Updates and
deletes are filtered by both task id and `session.user.id`, so a signed-in user
cannot mutate another user's task by submitting a different id. New task
features should preserve that boundary for every user-owned record.

## UI Layer

Route components compose reusable UI primitives from `app/components/ui/`.
Project-specific screens currently live directly in route modules. Keep shared,
generic UI in `app/components/ui/` and route-specific composition near the route
that owns it.

## Data Layer

The Drizzle client is exported from `drizzle/src/index.ts`. Database tables are
defined in `drizzle/src/db/schema.ts`; currently defined relation helpers for
Better Auth tables live in `drizzle/src/db/relations.ts`.

The schema currently includes Better Auth tables and application task tables.
