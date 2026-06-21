# Database

The app uses Drizzle ORM with Turso/libSQL. Database access is configured in
`drizzle/src/index.ts`, and Drizzle Kit is configured in `drizzle.config.ts`.

## Configuration

The database client requires these environment variables:

```sh
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

Better Auth also uses:

```sh
BETTER_AUTH_URL=
```

## Tables

Schema definitions live in `drizzle/src/db/schema.ts`.

- `user`: Better Auth user records.
- `session`: Better Auth sessions.
- `account`: Better Auth account/provider credentials.
- `verification`: Better Auth verification records.
- `task`: user-owned todo items.
- `subTask`: child todo items linked to a parent task.

## Relationships

- `session.userId` references `user.id`.
- `account.userId` references `user.id`.
- `task.userId` references `user.id`.
- `subTask.parentTaskId` references `task.id`.

User-owned records use cascading deletes where defined in the schema.

`drizzle/src/db/relations.ts` currently defines relation helpers for Better
Auth user/session/account tables. Task and subtask foreign keys are defined in
the schema, but relation helpers for those tables have not been added yet.

## Migrations

Tracked migration files live under `drizzle/`. Migration metadata lives under
`drizzle/meta/`.

Common Drizzle Kit commands:

```sh
bunx drizzle-kit generate
bunx drizzle-kit migrate
bunx drizzle-kit studio
```

When changing the schema:

1. Edit `drizzle/src/db/schema.ts`.
2. Generate a migration.
3. Review the generated SQL under `drizzle/`.
4. Apply the migration to the target database.
5. Update docs if the table shape or data flow changes.
