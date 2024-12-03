import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  LogIn as LogInIcon,
  UserCircle2 as UserCircle2Icon,
} from "@tamagui/lucide-icons";
import { ListItem, Popover, SizableText, XStack, YGroup } from "tamagui";

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
      <Popover placement="bottom-end">
        <Popover.Trigger
          w="$4.5"
          h="$4.5"
          jc="center"
          ai="center"
          mr="$-3"
          pressStyle={{ opacity: 0.25 }}
          cur="pointer"
        >
          <UserCircle2Icon size="$1.5" />
        </Popover.Trigger>
        <Popover.Content
          bw={1}
          bc="$borderColor"
          p="$0"
          mr="$3"
          enterStyle={{ scale: 0.75, opacity: 0 }}
          exitStyle={{ scale: 0.75, opacity: 0 }}
          transformOrigin="right top"
          animation="quickest"
        >
          <YGroup width={240}>
            <YGroup.Item>
              <ListItem
                hoverTheme
                pressTheme
                icon={LogInIcon}
                title="Sign in"
              />
            </YGroup.Item>
            {/* <Separator />
            <YGroup.Item>
              <ListItem hoverTheme pressTheme icon={Moon} title="Moon" />
            </YGroup.Item> */}
          </YGroup>
        </Popover.Content>
      </Popover>
    </XStack>
  );
}
