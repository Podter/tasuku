import { LogIn as LogInIcon } from "@tamagui/lucide-icons";
import { ListItem, YGroup } from "tamagui";

import type { WithCloseDropdown } from "./user-dropdown";

export default function Auth({ closeDropdown }: WithCloseDropdown) {
  return (
    <YGroup.Item>
      <ListItem hoverTheme pressTheme icon={LogInIcon} title="Sign in" />
    </YGroup.Item>
  );
}
