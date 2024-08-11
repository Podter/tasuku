/* eslint-disable import/namespace */
// @ts-check

import path from "path";
import { createRequestHandler as createExpoHandler } from "@expo/server";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { logger } from "hono/logger";

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
