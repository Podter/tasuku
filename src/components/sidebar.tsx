import { View } from "react-native";
import { Link } from "expo-router";

import { api } from "~/lib/api";
import { Text } from "./ui/text";

export default function Sidebar() {
  const { data, isFetching } = api.list.getMany.useQuery();

  return (
    <View className="flex-1 flex-col gap-4 border-r border-border p-4">
      <Link href="/" className="text-2xl font-bold">
        Tasuku
      </Link>
      {!isFetching && data && (
        <View className="gap-2">
          {data.map(({ id }) => (
            <List id={id} key={id} />
          ))}
        </View>
      )}
    </View>
  );
}

function List({ id }: { id: string }) {
  const { data, isFetching } = api.list.get.useQuery({ id });

  if (isFetching || !data) {
    return <Text>Loading...</Text>;
  }

  return (
    <Link
      href={{
        pathname: "/list/[id]",
        params: { id },
      }}
    >
      {data.name}
    </Link>
  );
}
