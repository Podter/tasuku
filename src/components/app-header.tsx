import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SizableText, XStack } from "tamagui";

import UserDropdown from "./user-dropdown";

export default function AppHeader() {
  const insets = useSafeAreaInsets();
  return (
    <XStack
      bg="$background"
      bbc="$borderColor"
      bbw={1}
      h="$6"
      mt={insets.top}
      px="$3"
      ai="center"
      jc="space-between"
    >
      <SizableText size="$7" fontWeight="bold">
        Tasuku
      </SizableText>
      <UserDropdown />
    </XStack>
  );
}
