import { createTRPCRouter, publicProcedure } from "../trpc";

export const helloRouter = createTRPCRouter({
  world: publicProcedure.query(() => {
    return {
      message: "Hello, world!",
    };
  }),
});
