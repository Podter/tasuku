import { lucia } from ".";

export type LuciaSession = Awaited<ReturnType<typeof lucia.validateSession>>;

export async function validateRequest(req: Request): Promise<LuciaSession> {
  const authorizationHeader = req.headers.get("Authorization");
  const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  return result;
}
