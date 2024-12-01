import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
// @ts-expect-error: somehow the types are not working
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [
    expoClient({
      scheme: "tasuku",
      storagePrefix: "tasuku",
      storage: Platform.OS === "web" ? window.localStorage : SecureStore,
    }),
  ],
});
