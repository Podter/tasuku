import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft as ArrowLeftIcon } from "@tamagui/lucide-icons";
import { Stack, XStack } from "tamagui";

export default function AuthHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <XStack bg="$background" h="$6" mt={insets.top} px="$3" ai="center">
      {router.canGoBack() && (
        <Stack
          w="$4.5"
          h="$4.5"
          jc="center"
          ai="center"
          ml="$-3"
          pressStyle={{ opacity: 0.25 }}
          cur="pointer"
          onPress={() => router.back()}
        >
          <ArrowLeftIcon />
        </Stack>
      )}
    </XStack>
  );
}
