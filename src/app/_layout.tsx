import "~/global.css";

import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";

import { useColorScheme } from "~/hooks/use-color-scheme";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { TRPCProvider } from "~/lib/api";
import { NAV_THEME } from "~/lib/constants";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        setAndroidNavigationBar(colorScheme);
        await SystemUI.setBackgroundColorAsync(
          NAV_THEME[colorScheme].background,
        );
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      setAndroidNavigationBar(colorScheme);
      await SystemUI.setBackgroundColorAsync(NAV_THEME[colorScheme].background);
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <TRPCProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: isDarkColorScheme
                ? DARK_THEME.colors.background
                : LIGHT_THEME.colors.background,
              paddingTop: Constants.statusBarHeight,
            },
          }}
        >
          <Stack.Screen
            name="(auth)"
            options={{
              animation: "slide_from_bottom",
              gestureDirection: "vertical",
            }}
          />
        </Stack>
      </ThemeProvider>
    </TRPCProvider>
  );
}

export { ErrorBoundary } from "expo-router";
