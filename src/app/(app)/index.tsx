import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useSession } from "~/hooks/use-session";

export default function Index() {
  const { logout, userData } = useSession();

  if (!userData) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center gap-2 text-center">
      <Text>Username: {userData.user.username}</Text>
      <Text>User ID: {userData.user.id}</Text>
      <Text>Session ID: {userData.session.id}</Text>
      <Button onPress={() => logout()} variant="secondary">
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
