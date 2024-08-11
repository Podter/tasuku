import type { ClassValue } from "clsx";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (Platform.OS === "web") {
    return "";
  }

  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    // return "https://tasuku.podter.me";
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    );
  }
  return `http://${localhost}:8081`;
}
