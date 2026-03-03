import { drizzle } from 'drizzle-orm/libsql';

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  throw new Error(
    "Missing environment variables: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set."
  );
}

// You can specify any property from the libsql connection options
export const db = drizzle({ 
  connection: { 
    url: TURSO_DATABASE_URL, 
    authToken: TURSO_AUTH_TOKEN
  }
});
