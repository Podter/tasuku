import type { PropsWithChildren } from "react";
import type { z } from "zod";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldErrors, useForm } from "react-hook-form";

import { api } from "~/lib/api";
import { ListSchema } from "~/validators/list";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

export default function NewList({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const utils = api.useUtils();
  const { mutate, isPending } = api.list.create.useMutation({
    onSuccess: async ({ id }) => {
      await utils.list.getMany.invalidate();
      setOpen(false);
      formReset();
      router.push({
        pathname: "/list/[id]",
        params: { id },
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Unable to create a new list",
        text2: "Something went wrong. Please try again later.",
      });
    },
  });

  const {
    control,
    handleSubmit,
    reset: formReset,
  } = useForm({
    resolver: zodResolver(ListSchema),
    defaultValues: {
      name: "",
    },
  });

  const onInvalid = useCallback(
    ({ name }: FieldErrors<z.infer<typeof ListSchema>>) => {
      if (name) {
        Toast.show({
          type: "error",
          text1: "List name is invalid",
          text2: name.message?.toString(),
        });
      }
    },
    [],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New List</DialogTitle>
          <DialogDescription>
            Enter the name of the new list you want to create.
          </DialogDescription>
        </DialogHeader>
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter your list name"
              className="w-full"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="w-[4.75rem]">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button
            className="w-[4.75rem]"
            onPress={handleSubmit((data) => mutate(data), onInvalid)}
            disabled={isPending}
          >
            <Text>Create</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
