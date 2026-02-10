import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "drizzle/src/index";
import { schema } from "drizzle/src/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
        provider: "libsql", // or "mysql", "sqlite"
        schema: schema
    }),
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      }
    },
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL
});
