import { useCallback } from "react";
import { RotateCw as RotateCwIcon } from "@tamagui/lucide-icons";
import { ListItem, YGroup } from "tamagui";

import type { WithCloseDropdown } from "./user-dropdown";
import { api } from "~/lib/api";

export default function Refresh({ closeDropdown }: WithCloseDropdown) {
  const utils = api.useUtils();

  const refetch = useCallback(() => {
    utils.task.getIds.refetch();
    closeDropdown();
  }, [closeDropdown, utils.task.getIds]);

  return (
    <YGroup.Item>
      <ListItem
        hoverTheme
        pressTheme
        icon={RotateCwIcon}
        title="Refresh"
        onPress={refetch}
      />
    </YGroup.Item>
  );
}
