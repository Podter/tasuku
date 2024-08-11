import { serverRouter } from "./router/server";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  server: serverRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
