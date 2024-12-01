import { Text, YStack } from "tamagui";

import { api } from "~/lib/api";

export default function Index() {
  const { data } = api.hello.world.useQuery();

  if (!data) {
    return (
      <YStack flex={1} jc="center" ai="center">
        <Text>Loading...</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} jc="center" ai="center">
      <Text>{data.message}</Text>
    </YStack>
  );
}
