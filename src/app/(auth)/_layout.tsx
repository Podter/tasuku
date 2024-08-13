import { useWindowDimensions } from "react-native";
import { Redirect, Stack } from "expo-router";

import Back from "~/components/back";
import Header from "~/components/header";
import { useSession } from "~/hooks/use-session";

export default function AuthLayout() {
  const { width } = useWindowDimensions();
  const { isLoading, userData } = useSession();

  if (isLoading) {
    // TODO: add loading screen
    return null;
  }

  if (userData) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: width >= 640 ? false : true,
        header: ({ navigation }) => (
          <Header
            left={() => <Back onPress={() => navigation.goBack()} />}
            border={false}
          />
        ),
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          animation: "fade",
        }}
      />
    </Stack>
  );
}
