import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text } from "~/components/ui/text";
import { api } from "~/lib/api";

export default function List() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetching } = api.list.get.useQuery({ id });

  if (isFetching || !data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>Name: {data.name}</Text>
    </View>
  );
}
