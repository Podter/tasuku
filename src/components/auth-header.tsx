import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft as ArrowLeftIcon } from "@tamagui/lucide-icons";
import { Stack, XStack } from "tamagui";

interface AuthHeaderProps {
  canGoBack: () => boolean;
  goBack: () => void;
}

export default function AuthHeader({ canGoBack, goBack }: AuthHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <XStack bg="$background" h="$6" mt={insets.top} px="$3" ai="center">
      {canGoBack() && (
        <Stack
          w="$4.5"
          h="$4.5"
          jc="center"
          ai="center"
          ml="$-3"
          pressStyle={{ opacity: 0.25 }}
          cur="pointer"
          onPress={() => goBack()}
          role="button"
        >
          <ArrowLeftIcon />
        </Stack>
      )}
    </XStack>
  );
}
