import type { DrawerHeaderProps } from "@react-navigation/drawer";
import { View } from "react-native";

import { Menu } from "./icons/menu";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

// TODO: make header as a reusable component
export default function DrawerHeader({
  options,
  navigation,
}: DrawerHeaderProps) {
  return (
    <View className="h-16 w-full flex-row items-center justify-between border-b border-border bg-background px-2">
      <View className="flex-row items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onPress={() => navigation.openDrawer()}
        >
          <Menu className="text-foreground" size={24} />
        </Button>
        {options.title && (
          <Text className="text-xl font-semibold">{options.title}</Text>
        )}
      </View>
      <View></View>
    </View>
  );
}
