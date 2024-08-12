import { View } from "react-native";
import { Link } from "expo-router";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useSession } from "~/hooks/use-session";
import { api } from "~/lib/api";

export default function Index() {
  const { logout, userData } = useSession();
  const utils = api.useUtils();

  const { data, isFetching } = api.list.getMany.useQuery();

  const { mutate } = api.list.create.useMutation({
    onSuccess: () => {
      utils.list.getMany.invalidate();
    },
  });

  if (!userData) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center gap-2 text-center">
      {isFetching || !data ? (
        <Text>Loading lists...</Text>
      ) : (
        <View className="gap-1">
          {data.map(({ id }) => (
            <List id={id} key={id} />
          ))}
        </View>
      )}
      <Button
        onPress={() => mutate({ name: Math.random().toString() })}
        variant="secondary"
      >
        <Text>Create List</Text>
      </Button>
      <Button onPress={() => logout()} variant="secondary">
        <Text>{userData.user.username} | Logout</Text>
      </Button>
    </View>
  );
}

function List({ id }: { id: string }) {
  const { data, isFetching } = api.list.get.useQuery({ id });

  if (isFetching || !data) {
    return <Text>Loading list name...</Text>;
  }

  return (
    <Link
      asChild
      href={{
        pathname: "/(app)/[list]",
        params: { list: id },
      }}
    >
      <Button>
        <Text>{data.name}</Text>
      </Button>
    </Link>
  );
}
