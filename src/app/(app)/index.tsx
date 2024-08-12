import { View } from "react-native";
import Toast from "react-native-toast-message";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useSession } from "~/hooks/use-session";
import { api } from "~/lib/api";

export default function Index() {
  const { logout, userData } = useSession();

  const { data, refetch } = api.server.random.useQuery();

  if (!userData) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center gap-2 text-center">
      {data?.message ? <Text>{data.message}</Text> : <Text>Loading...</Text>}
      <Button onPress={() => refetch()}>
        <Text>Get message</Text>
      </Button>
      <Button
        onPress={() =>
          Toast.show({
            text1: "Hello, world!",
            text2: "This is a toast message",
          })
        }
      >
        <Text>Show toast</Text>
      </Button>
      <Text>Hello, {userData.user.username}!</Text>
      <Text>User ID: {userData.user.id}</Text>
      <Text>Session ID: {userData.session.id}</Text>
      <Button onPress={() => logout()}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
