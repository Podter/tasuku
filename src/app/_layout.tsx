import "~/styles/scrollbar.css";

import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { PortalProvider, TamaguiProvider, useTheme } from "tamagui";

import AppHeader from "~/components/app-header";
import AuthHeader from "~/components/auth-header";
import { CurrentToast } from "~/components/current-toast";
import { TRPCProvider } from "~/lib/api";
import { tamaguiConfig } from "~/lib/tamagui";
import { DeleteModeProvider } from "~/providers/delete-mode-provider";

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
          <DeleteModeProvider>
            <PortalProvider shouldAddRootHost>
              <ToastProvider swipeDirection="up" duration={5000}>
                <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
                <App />
                <CurrentToast />
                <ToastViewport top="$8" left={0} right={0} />
              </ToastProvider>
            </PortalProvider>
          </DeleteModeProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </TRPCProvider>
  );
}

function App() {
  const theme = useTheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.background.val);
  }, [theme.background.val]);

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Tasuku",
          header: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          title: "Sign in",
          header: ({ navigation }) => (
            <AuthHeader
              canGoBack={navigation.canGoBack}
              goBack={navigation.goBack}
            />
          ),
        }}
      />
    </Stack>
  );
}
