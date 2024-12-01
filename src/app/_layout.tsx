import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TamaguiProvider, useTheme } from "tamagui";

import { TRPCProvider } from "~/lib/api";
import { tamaguiConfig } from "~/lib/tamagui";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <TRPCProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StatusBar
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          />
          <App />
        </ThemeProvider>
      </TamaguiProvider>
    </TRPCProvider>
  );
}

function App() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    />
  );
}
