import {
  type Config
} from "drizzle-kit";
import 'dotenv/config'; // load .env


if (process.env.DATABASE_URL === undefined) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  schema: "./db/schema.ts",
  dialect: "postgresql",
  out: "drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;

