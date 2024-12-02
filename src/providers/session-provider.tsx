import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { Redirect } from "expo-router";
import { Spinner, Text, YStack } from "tamagui";

import { authClient } from "~/lib/auth-client";

interface SessionContextType {
  session: NonNullable<ReturnType<typeof authClient.useSession>["data"]>;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const { data: session, error, isPending } = authClient.useSession();

  if (error !== null) {
    return (
      <YStack flex={1} jc="center" ai="center">
        <Text>Error: {error.message}</Text>
      </YStack>
    );
  }

  if (isPending) {
    return (
      <YStack flex={1} jc="center" ai="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (session === null) {
    return <Redirect href="/auth" />;
  }

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
