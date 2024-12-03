import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

import { Task } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  getIds: protectedProcedure.query(async ({ ctx: { session, db } }) => {
    const tasks = await db
      .select({
        id: Task.id,
      })
      .from(Task)
      .where(eq(Task.userId, session.user.id));
    return {
      ids: tasks.map((task) => task.id),
    };
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx: { session, db } }) => {
      const result = await db
        .select()
        .from(Task)
        .where(and(eq(Task.id, input.id), eq(Task.userId, session.user.id)))
        .limit(1);
      if (result.length < 1) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      return result[0];
    }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx: { session, db } }) => {
      const id = nanoid();
      await db.insert(Task).values({
        id,
        userId: session.user.id,
        title: input.title,
        done: false,
        createdAt: new Date(),
      });
      return { id };
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), done: z.boolean().optional() }))
    .mutation(async ({ input, ctx: { session, db } }) => {
      await db
        .update(Task)
        .set({
          done: input.done,
        })
        .where(and(eq(Task.id, input.id), eq(Task.userId, session.user.id)));
      return {};
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { session, db } }) => {
      await db
        .delete(Task)
        .where(and(eq(Task.id, input.id), eq(Task.userId, session.user.id)));
      return {};
    }),
});
