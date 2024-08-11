import type { TRPCRouterRecord } from "@trpc/server";

import { authRouter } from "./auth";

export const userRouter = {
  auth: authRouter,
} satisfies TRPCRouterRecord;
