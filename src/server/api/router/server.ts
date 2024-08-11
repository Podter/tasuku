import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "../trpc";

export const serverRouter = {
  random: publicProcedure.query(() => {
    return { message: `Random math: ${Math.random()}` };
  }),
} satisfies TRPCRouterRecord;
