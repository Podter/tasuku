import { Link } from "expo-router";
import {
  LogIn as LogInIcon,
  LogOut as LogOutIcon,
} from "@tamagui/lucide-icons";
import { ListItem, YGroup } from "tamagui";

import type { WithCloseDropdown } from "./user-dropdown";
import { authClient } from "~/lib/auth-client";

export default function Auth({ closeDropdown }: WithCloseDropdown) {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!data || data.user.isAnonymous) {
    return (
      <YGroup.Item>
        <Link href="/auth" asChild onPress={() => closeDropdown()}>
          <ListItem hoverTheme pressTheme icon={LogInIcon} title="Sign in" />
        </Link>
      </YGroup.Item>
    );
  }

  return (
    <YGroup.Item>
      <ListItem
        onPress={() => {
          authClient.signOut();
          closeDropdown();
        }}
        hoverTheme
        pressTheme
        icon={LogOutIcon}
        title="Sign out"
      />
    </YGroup.Item>
  );
}
