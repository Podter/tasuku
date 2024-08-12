import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View } from "react-native";

import { cn } from "~/lib/utils";
import Back from "./back";
import { Text } from "./ui/text";

interface HeaderProps extends NativeStackHeaderProps {
  border?: boolean;
}

export default function Header({
  back,
  options,
  navigation,
  border = true,
}: HeaderProps) {
  return (
    <View
      className={cn(
        "h-16 w-full flex-row items-center justify-between bg-background px-2",
        border && "border-b border-border",
      )}
    >
      <View className="flex-row items-center gap-2">
        {back && <Back onPress={() => navigation.goBack()} />}
        {options.title && (
          <Text className="text-xl font-semibold">{options.title}</Text>
        )}
      </View>
      <View></View>
    </View>
  );
}
