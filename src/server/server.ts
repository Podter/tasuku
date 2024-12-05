import fs from "fs/promises";
import path from "path";
import { createRequestHandler } from "@expo/server/adapter/express";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import express from "express";
import { glob } from "glob";
import morgan from "morgan";

import { db } from "./db";

dotenv.config();

const CLIENT_BUILD_DIR = path.join(__dirname, "client");
const SERVER_BUILD_DIR = path.join(__dirname, "server");
const DB_MIGRATIONS_DIR = path.join(__dirname, "drizzle");
const EXPO_PUBLIC_APP_URL =
  process.env.EXPO_PUBLIC_APP_URL || "https://tasuku.podter.hackclub.app";

process.env.NODE_ENV = "production";

(async () => {
  const [clientFiles, serverFiles] = await Promise.all([
    glob(CLIENT_BUILD_DIR + "/**/*.{html,js*}"),
    glob(SERVER_BUILD_DIR + "/**/*.{html,js*}"),
  ]);
  await Promise.all(
    [...clientFiles, ...serverFiles].map(async (file) => {
      const content = await fs.readFile(file, "utf-8");
      const newContent = content.replaceAll(
        EXPO_PUBLIC_APP_URL,
        process.env.APP_URL!,
      );
      await fs.writeFile(file, newContent);
    }),
  );

  await migrate(db, { migrationsFolder: DB_MIGRATIONS_DIR });

  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan("tiny"));

  // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable("x-powered-by");

  app.use(
    express.static(CLIENT_BUILD_DIR, {
      maxAge: "1h",
      extensions: ["html"],
    }),
  );

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
