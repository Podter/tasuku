import { useCallback } from "react";
import { Redirect, useRouter } from "expo-router";
import { Button, Spinner, Text, YStack } from "tamagui";

import { authClient } from "~/lib/auth-client";

export default function Auth() {
  const router = useRouter();
  const { data: session, error, isPending } = authClient.useSession();

  const continueAnonymous = useCallback(async () => {
    const res = await authClient.signIn.anonymous();
    if (res.error !== null) {
      router.replace("/");
    }
  }, [router]);

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

  if (session !== null) {
    return <Redirect href="/" />;
  }

  return (
    <YStack flex={1} jc="center" ai="center">
      <Button onPress={continueAnonymous}>Continue without signing in</Button>
    </YStack>
  );
}
