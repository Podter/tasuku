/* eslint-disable import/namespace */
// @ts-check

import path from "path";
import { createRequestHandler as createExpoHandler } from "@expo/server";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { Hono } from "hono";
import { logger } from "hono/logger";
import postgres from "postgres";

console.log("Running database migrations...");
const migrationClient = postgres(process.env.POSTGRES_URL ?? "", { max: 1 });
await migrate(drizzle(migrationClient), {
  migrationsFolder: path.join(process.cwd(), "dist", "migration"),
});

console.log("Starting server...");
const app = new Hono();
app.use(logger());

const handleRequest = createExpoHandler(
  path.join(process.cwd(), "dist", "server"),
);

app.use(serveStatic({ root: "./dist/client" }));
app.all((c) => handleRequest(c.req.raw));

serve(app, ({ address, port }) =>
  console.log(`Server running at ${address}:${port}`),
);
