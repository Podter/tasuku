import { Redirect, Slot } from "expo-router";

import { useSession } from "~/hooks/use-session";

export default function AuthLayout() {
  const { isLoading, userData } = useSession();

  if (isLoading) {
    // TODO: maybe add a loading spinner here
    return null;
  }

  if (!userData) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
