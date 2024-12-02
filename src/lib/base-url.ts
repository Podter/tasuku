import { Platform } from "react-native";
import Constants from "expo-constants";

export function getBaseUrl() {
  if (Platform.OS === "web" && Constants.debugMode) {
    return "http://localhost:8081";
  }

  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    // return "https://tasuku.app";
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    );
  }

  return `http://${localhost}:8081`;
}
