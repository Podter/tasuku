import { Redirect, Slot } from "expo-router";
import { Text, YStack } from "tamagui";

import { authClient } from "~/lib/auth-client";

export default function AppLayout() {
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
        <Text>Loading...</Text>
      </YStack>
    );
  }

  if (session === null) {
    return <Redirect href="/auth" />;
  }

  return <Slot />;
}
