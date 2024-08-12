import type { TRPCRouterRecord } from "@trpc/server";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { z } from "zod";

import { ListToTask, Task } from "~/server/db/schema";
import { listAccessMiddleware, taskAccessMiddleware } from "../middlewares";
import { protectedProcedure } from "../trpc";

export const taskRouter = {
  getMany: protectedProcedure.query(async ({ ctx: { db, user } }) => {
    const tasks = await db.query.Task.findMany({
      where: ({ userId }, { eq }) => eq(userId, user.id),
      columns: {
        id: true,
      },
    });
    return tasks;
  }),

  get: protectedProcedure
    .unstable_concat(taskAccessMiddleware)
    .query(async ({ ctx: { db, task } }) => {
      return {
        name: task.name,
        done: task.done,
      };
    }),

  create: protectedProcedure
    .unstable_concat(listAccessMiddleware)
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx: { db, user, list }, input }) => {
      const id = generateId(15);

      await db.insert(Task).values({
        id,
        name: input.name,
        userId: user.id,
        done: false,
      });
      await db.insert(ListToTask).values({
        listId: list.id,
        taskId: id,
      });

      return { id };
    }),

  update: protectedProcedure
    .unstable_concat(taskAccessMiddleware)
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx: { db, task }, input }) => {
      await db
        .update(Task)
        .set({
          name: input.name,
        })
        .where(eq(Task.id, task.id));
    }),

  delete: protectedProcedure
    .unstable_concat(taskAccessMiddleware)
    .mutation(async ({ ctx: { db, task } }) => {
      await db.delete(ListToTask).where(eq(ListToTask.taskId, task.id));
      await db.delete(Task).where(eq(Task.id, task.id));
    }),
} satisfies TRPCRouterRecord;
