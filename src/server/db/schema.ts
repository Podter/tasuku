import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// User
export const User = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Session
export const Session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

// List
export const List = pgTable("list", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id),
});

export const ListRelations = relations(List, ({ many }) => ({
  ListToTask: many(ListToTask),
}));

// Task
export const Task = pgTable("task", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  done: boolean("done").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id),
});

export const TaskRelations = relations(Task, ({ many }) => ({
  ListToTask: many(ListToTask),
}));

// ListToTask
export const ListToTask = pgTable(
  "list_to_task",
  {
    listId: text("list_id")
      .notNull()
      .references(() => List.id),
    taskId: text("task_id")
      .notNull()
      .references(() => Task.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.listId, t.taskId] }),
  }),
);

export const ListToTaskRelations = relations(ListToTask, ({ one }) => ({
  List: one(List, {
    fields: [ListToTask.listId],
    references: [List.id],
  }),
  Task: one(Task, {
    fields: [ListToTask.taskId],
    references: [Task.id],
  }),
}));
