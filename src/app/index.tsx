import { View } from "react-native";
import { Link } from "expo-router";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { api } from "~/lib/api";
import { deleteToken } from "~/lib/session-store";

export default function Index() {
  const utils = api.useUtils();

  const { data, refetch } = api.server.random.useQuery();
  const { data: userData } = api.user.auth.getSession.useQuery();
  const { mutate } = api.user.auth.logout.useMutation({
    onSuccess: async () => {
      await deleteToken();
      await utils.user.invalidate();
    },
  });

  return (
    <View className="flex-1 items-center justify-center gap-2 text-center">
      {data?.message ? <Text>{data.message}</Text> : <Text>Loading...</Text>}
      <Button onPress={() => refetch()}>
        <Text>Get message</Text>
      </Button>

      {userData?.user && userData?.session ? (
        <>
          <Text>Hello, {userData.user.username}!</Text>
          <Text>User ID: {userData.user.id}</Text>
          <Text>Session ID: {userData.session.id}</Text>
          <Button onPress={() => mutate()}>
            <Text>Logout</Text>
          </Button>
        </>
      ) : (
        <View className="flex-row gap-2">
          <Link href="/login" asChild>
            <Button className="w-28">
              <Text>Login</Text>
            </Button>
          </Link>
          <Link href="/signup" asChild>
            <Button className="w-28">
              <Text>Sign up</Text>
            </Button>
          </Link>
        </View>
      )}
    </View>
  );
}
