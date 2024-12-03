import { Platform } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Spinner, Stack } from "tamagui";

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
  const { data, isFetching, refetch } = api.task.getIds.useQuery();

  if (Platform.OS === "web" && isFetching && !data) {
    return (
      <Stack flex={1} jc="center" ai="center">
        <Spinner size="large" />
      </Stack>
    );
  }

  return (
    <FlashList
      data={data?.ids ?? []}
      estimatedItemSize={48}
      renderItem={({ item }) => <TodoItem id={item} />}
      onRefresh={() => refetch()}
      refreshing={isFetching}
    />
  );
}
