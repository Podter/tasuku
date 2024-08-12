import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "./trpc";

export const listAccessMiddleware = protectedProcedure
  .input(z.object({ id: z.string() }))
  .use(async ({ ctx: { db, user }, input, next }) => {
    const list = await db.query.List.findFirst({
      where: ({ id }, { eq }) => eq(id, input.id),
    });

    if (!list) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    if (list.userId !== user.id) {
      throw new TRPCError({
        code: "FORBIDDEN",
      });
    }

    return next({
      ctx: { list },
    });
  });

export const taskAccessMiddleware = protectedProcedure
  .input(z.object({ id: z.string() }))
  .use(async ({ ctx: { db, user }, input, next }) => {
    const task = await db.query.Task.findFirst({
      where: ({ id }, { eq }) => eq(id, input.id),
    });

    if (!task) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    if (task.userId !== user.id) {
      throw new TRPCError({
        code: "FORBIDDEN",
      });
    }

    return next({
      ctx: { task },
    });
  });
