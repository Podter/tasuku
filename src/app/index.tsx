import { useCallback } from "react";
import { Platform } from "react-native";
import { isLoading } from "expo-font";
import { useRefresh } from "@react-native-community/hooks";
import { FlashList } from "@shopify/flash-list";
import { Spinner, Stack } from "tamagui";

import NewTask from "~/components/new-task";
import TodoItem from "~/components/todo-item";
import { api } from "~/lib/api";
import { SessionProvider } from "~/providers/session-provider";

export default function Index() {
  return (
    <SessionProvider>
      <App />
    </SessionProvider>
  );
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
