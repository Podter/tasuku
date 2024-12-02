import { useCallback, useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";
import { Button, Spinner, YStack } from "tamagui";

import { authClient } from "~/lib/auth-client";

export default function Auth() {
  const router = useRouter();
  const toast = useToastController();
  const { data: session, error, isPending } = authClient.useSession();

  useEffect(() => {
    if (error !== null) {
      toast.show("An error occurred", {
        message: error.message,
      });
    }
  }, []);

  const continueAnonymous = useCallback(async () => {
    const res = await authClient.signIn.anonymous();
    if (res.error !== null) {
      router.replace("/");
    }
  }, [router]);

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
