import { useCallback } from "react";
import { RotateCw as RotateCwIcon } from "@tamagui/lucide-icons";
import { ListItem, YGroup } from "tamagui";

import type { WithCloseDropdown } from "./user-dropdown";
import { api } from "~/lib/api";

export default function Refresh({ closeDropdown }: WithCloseDropdown) {
  const utils = api.useUtils();

  const invalidate = useCallback(async () => {
    await utils.task.getIds.invalidate();
    await utils.task.getOne.invalidate();
  }, [utils.task.getIds, utils.task.getOne]);

  const refetch = useCallback(() => {
    invalidate();
    closeDropdown();
  }, [closeDropdown, invalidate]);

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
