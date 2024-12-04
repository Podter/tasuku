import path from "path";
import { createRequestHandler } from "@expo/server/adapter/express";
import compression from "compression";
import dotenv from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import express from "express";
import morgan from "morgan";

import { db } from "./db";

const CLIENT_BUILD_DIR = path.join(__dirname, "client");
const SERVER_BUILD_DIR = path.join(__dirname, "server");
const DB_MIGRATIONS_DIR = path.join(__dirname, "drizzle");

dotenv.config();

process.env.NODE_ENV = "production";

(async () => {
  await migrate(db, { migrationsFolder: DB_MIGRATIONS_DIR });

  const app = express();

  app.use(compression());

  // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable("x-powered-by");

  app.use(
    express.static(CLIENT_BUILD_DIR, {
      maxAge: "1h",
      extensions: ["html"],
    }),
  );

  app.use(morgan("tiny"));

  app.all(
    "*",
    createRequestHandler({
      build: SERVER_BUILD_DIR,
    }),
  );

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Tasuku server listening on port ${port}`);
  });
})();
