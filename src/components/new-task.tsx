import { useKeyboard } from "@react-native-community/hooks";
import { Plus as PlusIcon } from "@tamagui/lucide-icons";
import { Adapt, Button, Dialog, Input, Sheet, XStack, YStack } from "tamagui";

export default function NewTask() {
  return (
    <Dialog modal>
      <Trigger />
      <NewTaskSheet />
      <Content />
    </Dialog>
  );
}

function Content() {
  const { keyboardHeight, keyboardShown } = useKeyboard();

  return (
    <Dialog.Portal paddingBottom={keyboardShown ? keyboardHeight : 0}>
      <Dialog.Overlay
        key="overlay"
        animation="slow"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Dialog.Content
        bordered
        elevate
        key="content"
        animation="quicker"
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        gap="$4"
        width={384}
      >
        <YStack>
          <Dialog.Title fontSize="$8">New task</Dialog.Title>
          <Dialog.Description>
            Give your task a name and add it to your list.
          </Dialog.Description>
        </YStack>

        <Input id="name" placeholder="Name" />

        <XStack alignSelf="flex-end" gap="$4">
          <Dialog.Close displayWhenAdapted asChild>
            <Button aria-label="Cancel">Cancel</Button>
          </Dialog.Close>
          <Button theme="active" aria-label="Create">
            Create
          </Button>
        </XStack>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function Trigger() {
  return (
    <Dialog.Trigger asChild>
      <Button
        pos="absolute"
        b="$3.5"
        r="$3.5"
        circular
        p="$0"
        w="$4.5"
        h="$4.5"
      >
        <PlusIcon />
      </Button>
    </Dialog.Trigger>
  );
}

function NewTaskSheet() {
  return (
    <Adapt when="sm" platform="touch">
      <Sheet
        animation="quicker"
        modal
        dismissOnSnapToBottom
        snapPointsMode="fit"
        moveOnKeyboardChange
      >
        <Sheet.Frame
          padding="$4"
          gap="$4"
          btw={1}
          blw={1}
          brw={1}
          borderColor="$borderColor"
        >
          <Adapt.Contents />
        </Sheet.Frame>
        <Sheet.Overlay />
      </Sheet>
    </Adapt>
  );
}
