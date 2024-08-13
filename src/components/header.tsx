import { View } from "react-native";

import { cn } from "~/lib/utils";
import { Text } from "./ui/text";

interface HeaderProps {
  title?: string;
  left?: React.FC;
  right?: React.FC;
  border?: boolean;
}

export default function Header({
  title,
  left: Left,
  right: Right,
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
        {Left && <Left />}
        {title && <Text className="text-xl font-semibold">{title}</Text>}
      </View>
      <View className="flex-row items-center">{Right && <Right />}</View>
    </View>
  );
}
