import { useCallback, useEffect, useState } from "react";
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

  const [loading, setLoading] = useState<
    "anonymous" | "github" | "discord" | null
  >(null);

  useEffect(() => {
    if (error !== null) {
      toast.show("An error occurred", {
        message: error.message,
      });
    }
  }, [error, toast]);

  const anonymousLogin = useCallback(async () => {
    try {
      setLoading("anonymous");
      await authClient.signIn.anonymous();
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.show("An error occurred", {
        message: "Failed to sign in anonymously",
      });
      return;
    } finally {
      setLoading(null);
    }
  }, [router, toast]);

  const githubLogin = useCallback(async () => {
    try {
      setLoading("github");
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      console.error(err);
      toast.show("An error occurred", {
        message: "Failed to sign in with GitHub",
      });
      return;
    } finally {
      setLoading(null);
    }
  }, [toast]);

  const discordLogin = useCallback(async () => {
    try {
      setLoading("discord");
      await authClient.signIn.social({
        provider: "discord",
        callbackURL: "/",
      });
    } catch (err) {
      console.error(err);
      toast.show("An error occurred", {
        message: "Failed to sign in with Discord",
      });
      return;
    } finally {
      setLoading(null);
    }
  }, [toast]);

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
        <Button
          onPress={anonymousLogin}
          icon={loading === "anonymous" ? <Spinner /> : <UserRoundIcon />}
        >
          Continue anonymously
        </Button>
        <Button
          onPress={githubLogin}
          icon={
            loading === "github" ? <Spinner /> : <FontAwesome6 name="github" />
          }
        >
          Continue with GitHub
        </Button>
        <Button
          onPress={discordLogin}
          icon={
            loading === "discord" ? (
              <Spinner />
            ) : (
              <FontAwesome6 name="discord" />
            )
          }
        >
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
