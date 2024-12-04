import { Platform } from "react-native";
import Constants from "expo-constants";

const APP_URL = "https://tasuku.podter.hackclub.app";

export function getBaseUrl() {
  if (Platform.OS === "web" && Constants.debugMode) {
    return "http://localhost:8081";
  }

  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    return APP_URL;
  }

  return `http://${localhost}:8081`;
}
