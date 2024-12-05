import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { useRefresh } from "@react-native-community/hooks";
import { FlashList } from "@shopify/flash-list";
import { useToastController } from "@tamagui/toast";
import { Spinner, Stack, YStack } from "tamagui";

import NewTask from "~/components/new-task";
import Redirect from "~/components/redirect";
import TodoItem from "~/components/todo-item";
import { api } from "~/lib/api";
import { authClient } from "~/lib/auth-client";

export default function Index() {
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
    return <Redirect to="/auth" />;
  }

  return <App />;
}

function App() {
  const utils = api.useUtils();
  const { data, isLoading } = api.task.getIds.useQuery();

  const invalidate = useCallback(async () => {
    await utils.task.getIds.invalidate();
    await utils.task.getOne.invalidate();
  }, [utils.task.getIds, utils.task.getOne]);

  const { isRefreshing, onRefresh } = useRefresh(invalidate);

  if (Platform.OS === "web" && isLoading) {
    return (
      <Stack flex={1} jc="center" ai="center">
        <Spinner size="large" />
      </Stack>
    );
  }

  return (
    <>
      <FlashList
        data={data?.ids ?? []}
        estimatedItemSize={48}
        renderItem={({ item }) => <TodoItem id={item} />}
        onRefresh={onRefresh}
        refreshing={isRefreshing || isLoading}
      />
      <NewTask />
    </>
  );
}
