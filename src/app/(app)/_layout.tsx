import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Redirect, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";

import Header from "~/components/header";
import { Menu } from "~/components/icons/menu";
import Sidebar from "~/components/sidebar";
import { Button } from "~/components/ui/button";
import { useSession } from "~/hooks/use-session";

export default function AppLayout() {
  const { width } = useWindowDimensions();
  const { isLoading, userData } = useSession();

  const [sidebarOepn, setSidebarOpen] = useState(true);

  if (isLoading) {
    // TODO: maybe add a loading spinner here
    return null;
  }

  if (!userData) {
    return <Redirect href="/login" />;
  }

  if (width >= 768) {
    return (
      <View className="flex-1 flex-row">
        {/* TODO: add animation */}
        {sidebarOepn && (
          <View className="max-w-80 flex-1">
            <Sidebar />
          </View>
        )}
        <Stack
          screenOptions={{
            header: ({ options }) => (
              <Header
                left={() => (
                  <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => setSidebarOpen((v) => !v)}
                  >
                    <Menu className="text-foreground" size={24} />
                  </Button>
                )}
                title={options.title}
              />
            ),
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
        </Stack>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* TODO: Style drawer */}
      <Drawer
        screenOptions={{
          header: ({ navigation, options }) => (
            <Header
              left={() => (
                <Button
                  variant="ghost"
                  size="icon"
                  onPress={() => navigation.toggleDrawer()}
                >
                  <Menu className="text-foreground" size={24} />
                </Button>
              )}
              title={options.title}
            />
          ),
        }}
        drawerContent={() => <Sidebar />}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
