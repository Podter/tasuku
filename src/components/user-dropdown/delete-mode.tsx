import {
  Check as CheckIcon,
  Trash2 as Trash2Icon,
} from "@tamagui/lucide-icons";
import { ListItem, YGroup } from "tamagui";

import type { WithCloseDropdown } from "./user-dropdown";
import { useDeleteMode } from "~/providers/delete-mode-provider";

export default function DeleteMode({ closeDropdown }: WithCloseDropdown) {
  const { deleteMode, setDeleteMode } = useDeleteMode();

  return (
    <YGroup.Item>
      <ListItem
        onPress={() => {
          setDeleteMode((v) => !v);
          closeDropdown();
        }}
        hoverTheme
        pressTheme
        icon={deleteMode ? CheckIcon : Trash2Icon}
        title={deleteMode ? "Exit delete tasks" : "Delete tasks"}
      />
    </YGroup.Item>
  );
}
