import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect } from "react";
import { Redirect } from "expo-router";
import { useToastController } from "@tamagui/toast";
import { Spinner, YStack } from "tamagui";

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
  const toast = useToastController();
  const { data: session, error, isPending } = authClient.useSession();

  useEffect(() => {
    if (error !== null) {
      toast.show("An error occurred", {
        message: error.message,
      });
    }
  }, [error, toast]);

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
