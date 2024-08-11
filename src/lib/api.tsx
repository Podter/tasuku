import type { PropsWithChildren } from "react";
import { useState } from "react";
import { Platform } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

import type { AppRouter } from "~/server/api";
// import { getToken } from "./session-store";
import { getBaseUrl } from "./utils";

export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "~/server/api";

export function TRPCProvider(props: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: () => true,
          colorMode: Platform.OS === "web" ? "css" : "ansi",
        }),
        httpBatchLink({
          transformer: superjson,
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Map<string, string>();
            // const token = getToken();
            // if (token) headers.set("Authorization", `Bearer ${token}`);
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
