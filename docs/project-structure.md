# Project Structure

This repo is a React Router app with server-side route loaders/actions, Better
Auth, and a Drizzle-managed Turso/libSQL database.

## Top-Level Files

- `package.json`: project metadata, dependencies, and Bun scripts.
- `react-router.config.ts`: React Router framework configuration.
- `vite.config.ts`: Vite configuration and TypeScript path support.
- `tsconfig.json`: TypeScript compiler options.
- `eslint.config.ts`: ESLint configuration.
- `drizzle.config.ts`: Drizzle Kit configuration for Turso migrations.
- `components.json`: shadcn-style UI component configuration.
- `Dockerfile`: production container build.
- `TODO.md`: current feature backlog.

## App Source

- `app/root.tsx`: root document layout, global links, outlet, and error
  boundary.
- `app/routes.ts`: central React Router route map.
- `app/routes/`: page routes and server action endpoints.
- `app/components/ui/`: reusable shadcn-style UI primitives.
- `app/lib/`: shared application utilities, including auth setup.
- `app/hooks/`: shared React hooks.
- `app/app.css`: global styles and Tailwind entrypoint.

## Routes

Route modules live under `app/routes/` and are connected in `app/routes.ts`.

- `home.tsx`: index route.
- `tasks.tsx`: authenticated task list route.
- `login.tsx`: email/password login UI.
- `signup.tsx`: email/password signup UI.
- `action-endpoints/tasks.ts`: task mutation endpoint for create, complete,
  and delete operations.
- `auth-catcher.ts`: Better Auth catch-all handler for `/api/auth/*`.

## Database Files

- `drizzle/src/index.ts`: Drizzle database client.
- `drizzle/src/db/schema.ts`: database schema definitions.
- `drizzle/src/db/relations.ts`: Drizzle relation definitions.
- `drizzle/*.sql`: tracked migration files.
- `drizzle/meta/`: tracked Drizzle migration snapshots and journal metadata.

## Generated and Ignored Files

The following directories are generated or local-only and should not be edited
as source files:

- `.react-router/`
- `build/`
- `node_modules/`
- `better-auth_migrations/`

Drizzle migration files under `drizzle/` are tracked and should be reviewed when
schema changes are made.
