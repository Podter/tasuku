import { View } from "react-native";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full gap-3 px-12">
        <Slot />
      </View>
    </View>
  );
}
