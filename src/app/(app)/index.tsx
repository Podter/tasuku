import { useCallback } from "react";
import { useRouter } from "expo-router";
import { Button, H1, Text, YStack } from "tamagui";

import { api } from "~/lib/api";
import { authClient } from "~/lib/auth-client";

export default function Index() {
  const router = useRouter();

  const { data } = api.hello.world.useQuery();

  const logout = useCallback(async () => {
    const res = await authClient.signOut();
    if (res.error !== null) {
      router.replace("/auth");
    }
  }, [router]);

  if (!data) {
    return (
      <YStack flex={1} jc="center" ai="center">
        <Text>Loading...</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} jc="center" ai="center" flexDirection="column" gap="$4">
      <H1>{data.message}</H1>
      <Button onPress={logout}>Logout</Button>
    </YStack>
  );
}
