import { useWindowDimensions } from "react-native";
import { Stack } from "expo-router";

import Header from "~/components/header";

export default function AuthLayout() {
  const { width } = useWindowDimensions();

  return (
    <Stack
      screenOptions={{
        headerShown: width >= 640 ? false : true,
        // @ts-expect-error - type is not correct
        header: (props) => <Header {...props} border={false} />,
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
