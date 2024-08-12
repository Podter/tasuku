import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

function singleton<T>(name: string, value: () => T): T {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

function createDrizzle() {
  const queryClient = postgres(process.env.POSTGRES_URL!);
  return drizzle(queryClient, { schema });
}

export const db = singleton("db", createDrizzle);
