import type { TRPCRouterRecord } from "@trpc/server";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";

import { List, ListToTask, Task } from "~/server/db/schema";
import { ListSchema } from "~/validators/list";
import { listAccessMiddleware } from "../middlewares";
import { protectedProcedure } from "../trpc";

export const listRouter = {
  getMany: protectedProcedure.query(async ({ ctx: { db, user } }) => {
    const lists = await db.query.List.findMany({
      where: ({ userId }, { eq }) => eq(userId, user.id),
      columns: {
        id: true,
        name: true,
      },
    });
    return lists;
  }),

  get: protectedProcedure
    .unstable_concat(listAccessMiddleware)
    .query(async ({ ctx: { db, list } }) => {
      const tasks = await db.query.ListToTask.findMany({
        where: ({ listId }, { eq }) => eq(listId, list.id),
        columns: {},
        with: {
          Task: {
            columns: {
              id: true,
            },
          },
        },
      });

      return {
        name: list.name,
        tasks: tasks.map(({ Task }) => Task.id),
      };
    }),

  create: protectedProcedure
    .input(ListSchema)
    .mutation(async ({ ctx: { db, user }, input }) => {
      const id = generateId(15);
      await db.insert(List).values({
        id,
        name: input.name,
        userId: user.id,
      });
      return { id };
    }),

  update: protectedProcedure
    .unstable_concat(listAccessMiddleware)
    .input(ListSchema)
    .mutation(async ({ ctx: { db, list }, input }) => {
      await db
        .update(List)
        .set({
          name: input.name,
        })
        .where(eq(List.id, list.id));
    }),

  delete: protectedProcedure
    .unstable_concat(listAccessMiddleware)
    .mutation(async ({ ctx: { db, list } }) => {
      await db.delete(ListToTask).where(eq(ListToTask.listId, list.id));
      await Promise.all([
        db.delete(Task).where(eq(Task.id, list.id)),
        db.delete(List).where(eq(List.id, list.id)),
      ]);
    }),
} satisfies TRPCRouterRecord;
