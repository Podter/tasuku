import { listRouter } from "./router/list";
import { serverRouter } from "./router/server";
import { taskRouter } from "./router/task";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  server: serverRouter,
  user: userRouter,
  list: listRouter,
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
