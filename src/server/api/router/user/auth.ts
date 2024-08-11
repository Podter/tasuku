import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { generateId, Scrypt } from "lucia";

import { protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { lucia } from "~/server/auth";
import { User } from "~/server/db/schema";
import { LoginSchema, SignUpSchema } from "~/validators/auth";

export const authRouter = {
  // Login
  login: publicProcedure
    .input(LoginSchema)
    .mutation(async ({ ctx: { db }, input }) => {
      const user = await db.query.User.findFirst({
        where: ({ username }, { or, eq, and }) => eq(username, input.username),
        columns: {
          id: true,
          password: true,
        },
      });
      if (!user) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const validPassword = await new Scrypt().verify(
        user.password,
        input.password,
      );
      if (!validPassword) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const session = await lucia.createSession(user.id, {});
      return {
        sessionId: session.id,
      };
    }),

  // Sign up
  signup: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ ctx: { db }, input }) => {
      const hashedPassword = await new Scrypt().hash(input.password);
      const userId = generateId(15);

      await db.insert(User).values({
        id: userId,
        username: input.username,
        password: hashedPassword,
      });

      const session = await lucia.createSession(userId, {});
      return {
        sessionId: session.id,
      };
    }),

  // Logout
  logout: protectedProcedure.mutation(async ({ ctx: { session } }) => {
    await lucia.invalidateSession(session.id);
    return { success: true };
  }),

  // Get session
  getSession: publicProcedure.query(async ({ ctx: { session, user } }) => {
    if (!session || !user) {
      if (session) {
        await lucia.invalidateSession(session.id);
      }
      return {
        session: null,
        user: null,
      };
    } else {
      return { session, user };
    }
  }),
} satisfies TRPCRouterRecord;
