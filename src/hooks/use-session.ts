import { useCallback, useMemo } from "react";

import { api } from "~/lib/api";
import { deleteToken } from "~/lib/session-store";

export function useSession() {
  const utils = api.useUtils();
  const { data, isLoading } = api.user.auth.getSession.useQuery();

  const userData = useMemo(() => {
    if (isLoading) return null;

    if (!data?.session || !data.user) {
      return null;
    }

    return {
      session: data.session,
      user: data.user,
    };
  }, [data, isLoading]);

  const { mutateAsync: logoutAsync } = api.user.auth.logout.useMutation();

  const updateSession = useCallback(async () => {
    await utils.user.auth.getSession.invalidate();
  }, [utils]);

  const logout = useCallback(async () => {
    await logoutAsync();
    await deleteToken();
    await updateSession();
  }, [logoutAsync, updateSession]);

  return {
    userData,
    isLoading,
    updateSession,
    logout,
  };
}
