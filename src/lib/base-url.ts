import Constants from "expo-constants";

export function getBaseUrl() {
  const appUrl = process.env.EXPO_PUBLIC_APP_URL!;

  if (appUrl === "http://localhost:8081") {
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localhost = debuggerHost?.split(":")[0];
    if (localhost) {
      return `http://${localhost}:8081`;
    } else {
      return "http://localhost:8081";
    }
  }

  return appUrl;
}
