import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { getBaseUrl } from "~/lib/utils";

export default function Index() {
  const [message, setMessage] = useState("Loading...");

  const getMessage = useCallback(async () => {
    const { message } = await fetch(`${getBaseUrl()}/api/hello`).then(
      (res) => res.json() as Promise<{ message: string }>,
    );
    setMessage(message);
  }, []);

  useEffect(() => {
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="flex-1 items-center justify-center gap-2 text-center">
      <Text>{message}</Text>
      <Button onPress={getMessage}>
        <Text>Get message</Text>
      </Button>
    </View>
  );
}
