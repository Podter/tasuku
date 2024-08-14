import type { PropsWithChildren } from "react";

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
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New List</DialogTitle>
          <DialogDescription>
            Enter the name of the new list you want to create.
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="Enter your list name" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="w-[4.75rem]">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button className="w-[4.75rem]">
            <Text>Create</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
