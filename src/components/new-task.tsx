import { useCallback, useState } from "react";
import { useKeyboard } from "@react-native-community/hooks";
import { Plus as PlusIcon } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Dialog,
  Form,
  Input,
  Sheet,
  Spinner,
  XStack,
  YStack,
} from "tamagui";

import { api } from "~/lib/api";

interface WithCloseDialog {
  closeDialog: () => void;
}

export default function NewTask() {
  const [open, setOpen] = useState(false);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Trigger />
      <NewTaskSheet />
      <Content closeDialog={closeDialog} />
    </Dialog>
  );
}

function Content({ closeDialog }: WithCloseDialog) {
  const { keyboardHeight, keyboardShown } = useKeyboard();
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const { mutate, isPending } = api.task.create.useMutation({
    onSuccess: () => {
      utils.task.invalidate();
      closeDialog();
    },
  });

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
        asChild
      >
        <Form onSubmit={() => mutate({ title: name })}>
          <YStack>
            <Dialog.Title fontSize="$8">New task</Dialog.Title>
            <Dialog.Description>
              Give your task a name and add it to your list.
            </Dialog.Description>
          </YStack>

          <Input
            id="name"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            disabled={isPending}
          />

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button aria-label="Cancel">Cancel</Button>
            </Dialog.Close>
            <Form.Trigger asChild disabled={isPending}>
              <Button
                theme="active"
                aria-label="Create"
                icon={isPending ? <Spinner /> : undefined}
              >
                Create
              </Button>
            </Form.Trigger>
          </XStack>
        </Form>
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
