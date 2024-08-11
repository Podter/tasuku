import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.POSTGRES_URL! },
} satisfies Config;
