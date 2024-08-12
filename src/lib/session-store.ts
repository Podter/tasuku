import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const KEY = "session-id";

export function getToken() {
  if (Platform.OS === "web") {
    return localStorage.getItem(KEY);
  }
  return SecureStore.getItem(KEY);
}

export async function deleteToken() {
  if (Platform.OS === "web") {
    return localStorage.removeItem(KEY);
  }
  await SecureStore.deleteItemAsync(KEY);
}

export async function setToken(value: string) {
  if (Platform.OS === "web") {
    return localStorage.setItem(KEY, value);
  }
  await SecureStore.setItemAsync(KEY, value);
}
