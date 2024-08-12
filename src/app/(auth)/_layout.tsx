import { useWindowDimensions } from "react-native";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const { width } = useWindowDimensions();

  return (
    <Stack
      screenOptions={{
        headerShown: width >= 640 ? false : true,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
