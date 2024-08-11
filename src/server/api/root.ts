import { serverRouter } from "./router/server";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  server: serverRouter,
});

export type AppRouter = typeof appRouter;
