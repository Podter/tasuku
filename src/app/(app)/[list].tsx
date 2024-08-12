import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text } from "~/components/ui/text";

export default function List() {
  const { list: id } = useLocalSearchParams<{ list: string }>();

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
