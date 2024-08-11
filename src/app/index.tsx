import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { api } from "~/lib/api";

export default function Index() {
  const { data, refetch } = api.server.random.useQuery();

  return (
    <View className="flex-1 items-center justify-center gap-2 text-center">
      {data?.message ? <Text>{data.message}</Text> : <Text>Loading...</Text>}
      <Button onPress={() => refetch()}>
        <Text>Get message</Text>
      </Button>
    </View>
  );
}
