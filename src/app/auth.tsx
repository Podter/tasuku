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

  const anonymousLogin = useCallback(async () => {
    await authClient.signIn.anonymous();
    router.replace("/");
  }, [router]);

  const githubLogin = useCallback(async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  }, []);

  const discordLogin = useCallback(async () => {
    await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/",
    });
  }, []);

  if (isPending) {
    return (
      <YStack flex={1} jc="center" ai="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (session !== null && !session.user.isAnonymous) {
    return <Redirect href="/" />;
  }

  return (
    <YStack flex={1} jc="center" ai="center" gap="$2">
      <Button onPress={anonymousLogin}>Continue without signing in</Button>
      <Button onPress={githubLogin}>Continue with GitHub</Button>
      <Button onPress={discordLogin}>Continue with Discord</Button>
    </YStack>
  );
}
