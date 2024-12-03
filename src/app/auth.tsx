import { useCallback, useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { UserRound as UserRoundIcon } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { Button, H1, Paragraph, Spinner, YStack } from "tamagui";

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
  }, [error, toast]);

  const anonymousLogin = useCallback(async () => {
    await authClient.signIn.anonymous();
    await new Promise((resolve) => setTimeout(resolve, 500));
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
    <YStack flex={1} jc="center" ai="center" gap="$4">
      <YStack gap="$2" ai="center" px="$6">
        <H1 textAlign="center">Tasuku</H1>
        <Paragraph textAlign="center">
          A simple todo app that helps you focus on one task at a time.
        </Paragraph>
      </YStack>
      <YStack gap="$2">
        <Button onPress={anonymousLogin} icon={<UserRoundIcon />}>
          Continue anonymously
        </Button>
        <Button onPress={githubLogin} icon={<FontAwesome6 name="github" />}>
          Continue with GitHub
        </Button>
        <Button onPress={discordLogin} icon={<FontAwesome6 name="discord" />}>
          Continue with Discord
        </Button>
      </YStack>
      {session?.user.isAnonymous && (
        <Paragraph textAlign="center" px="$8" opacity={0.5}>
          All data will be deleted once you sign in with a social account.
        </Paragraph>
      )}
      <YStack h="$4.5" />
    </YStack>
  );
}
