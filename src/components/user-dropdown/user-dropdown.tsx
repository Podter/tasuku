import { useCallback, useState } from "react";
import { UserCircle2 as UserCircle2Icon } from "@tamagui/lucide-icons";
import { Popover, Separator, YGroup } from "tamagui";

import Auth from "./auth";
import Refresh from "./refresh";

export interface WithCloseDropdown {
  closeDropdown: () => void;
}

export default function UserDropdown() {
  const [open, setOpen] = useState(false);

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Popover placement="bottom-end" open={open} onOpenChange={setOpen}>
      <Trigger />
      <Content closeDropdown={closeDropdown} />
    </Popover>
  );
}

function Content({ closeDropdown }: WithCloseDropdown) {
  return (
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
        <Refresh closeDropdown={closeDropdown} />
        <Separator />
        <Auth closeDropdown={closeDropdown} />
      </YGroup>
    </Popover.Content>
  );
}

function Trigger() {
  return (
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
  );
}
