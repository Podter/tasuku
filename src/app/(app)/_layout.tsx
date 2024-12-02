import { Slot } from "expo-router";

import { SessionProvider } from "~/providers/session-provider";

export default function AppLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
