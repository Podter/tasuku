import type { createAuthClient as CreateAuthClient } from "better-auth/react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { expoClient } from "@better-auth/expo/src/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-expect-error: cant import from "better-auth/react" directly
import { createAuthClient } from "better-auth/dist/react.js";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [
    expoClient({
      scheme: "tasuku",
      storagePrefix: "tasuku",
      // @ts-expect-error: this is fine
      storage: Platform.OS === "web" ? AsyncStorage : SecureStore,
    }),
  ],
} as Parameters<typeof CreateAuthClient>[0]);
