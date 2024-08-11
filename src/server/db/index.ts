import { drizzle } from "drizzle-orm/vercel-postgres";
import postgres from "postgres";

import * as schema from "./schema";

const queryClient = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(queryClient, { schema });
