import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const url: string = process.env.TURSO_DATABASE_URL!;
const authToken: string = process.env.TURSO_AUTH_TOKEN!;

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: url,
    authToken: authToken,
  },
});
