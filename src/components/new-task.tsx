import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, useWindowDimensions } from "react-native";
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

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setOpen(false),
    );
    return () => {
      hideSubscription.remove();
    };
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
  const { height } = useWindowDimensions();
  const { keyboardHeight } = useKeyboard();
  const utils = api.useUtils();

  const nameRef = useRef("");
  const { mutate, isPending } = api.task.create.useMutation({
    onSuccess: () => {
      utils.task.invalidate();
      closeDialog();
    },
  });

  return (
    <Dialog.Portal>
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
        y={-keyboardHeight / 2}
        width={384}
      >
        <Form onSubmit={() => mutate({ title: nameRef.current })} gap="$4">
          <YStack>
            <Dialog.Title fontSize="$8">New task</Dialog.Title>
            <Dialog.Description>
              Give your task a name and add it to your list.
            </Dialog.Description>
          </YStack>

          <Input
            id="name"
            placeholder="Name"
            onChangeText={(v) => (nameRef.current = v)}
            onSubmitEditing={() => mutate({ title: nameRef.current })}
            submitBehavior="submit"
            autoFocus
          />

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              {/* @ts-expect-error: for the web */}
              <Button aria-label="Cancel" type="button">
                Cancel
              </Button>
            </Dialog.Close>
            <Form.Trigger asChild disabled={isPending}>
              <Button
                theme="active"
                aria-label="Create"
                icon={isPending ? <Spinner /> : undefined}
                // @ts-expect-error: for the web
                type="submit"
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
        animation="quickest"
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
