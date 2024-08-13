import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useSession } from "~/hooks/use-session";
import { api } from "~/lib/api";

export default function Index() {
  const { logout, userData } = useSession();
  const utils = api.useUtils();

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
