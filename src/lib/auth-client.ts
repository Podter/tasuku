import type { createAuthClient as CreateAuthClient } from "better-auth/react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { expoClient } from "@better-auth/expo/dist/client.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-expect-error: cant import from "better-auth/client/plugins" directly
import { anonymousClient } from "better-auth/dist/client/plugins";
// @ts-expect-error: cant import from "better-auth/react" directly
import { createAuthClient } from "better-auth/dist/react";

export const authClient = (createAuthClient as typeof CreateAuthClient)({
  baseURL: "http://localhost:8081",
  plugins: [
    expoClient({
      scheme: "tasuku",
      storagePrefix: "tasuku",
      // @ts-expect-error: this is fine
      storage: Platform.OS === "web" ? AsyncStorage : SecureStore,
    }),
    anonymousClient(),
  ],
});
