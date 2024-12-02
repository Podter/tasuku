import { Suspense, useCallback } from "react";
import { useRouter } from "expo-router";
import { Button, H1, Spinner, YStack } from "tamagui";

import { api } from "~/lib/api";
import { authClient } from "~/lib/auth-client";

export default function Index() {
  const router = useRouter();

  const [{ message }] = api.hello.world.useSuspenseQuery();

  const logout = useCallback(async () => {
    const res = await authClient.signOut();
    if (res.error !== null) {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <YStack flex={1} jc="center" ai="center" flexDirection="column" gap="$4">
      <Suspense fallback={<Spinner />}>
        <H1>{message}</H1>
      </Suspense>
      <Button onPress={logout}>Logout</Button>
    </YStack>
  );
}
