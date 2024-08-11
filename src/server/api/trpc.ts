import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import type { LuciaSession } from "../auth/session";
import { validateRequest } from "../auth/session";
import { db } from "../db";

interface CreateContextOptions {
  req: Request;
  session?: LuciaSession | null;
}

export async function createTRPCContext(opts: CreateContextOptions) {
  const { req } = opts;
  const { session, user } = opts.session ?? (await validateRequest(req));
  return {
    session,
    user,
    db,
    req,
  };
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` and `user` as non-nullable
      session: ctx.session,
      user: ctx.user,
    },
  });
});
