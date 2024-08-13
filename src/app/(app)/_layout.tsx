import { useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Redirect, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";

import Header from "~/components/header";
import { Menu } from "~/components/icons/menu";
import { Button } from "~/components/ui/button";
import { useSession } from "~/hooks/use-session";
import { NAV_THEME } from "~/lib/constants";

export default function AppLayout() {
  const { width } = useWindowDimensions();
  const { isLoading, userData } = useSession();

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
        <View className="max-w-80 flex-1 border-r border-border"></View>
        <Stack
          screenOptions={{
            header: ({ options }) => <Header title={options.title} />,
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
          drawerStyle: {
            borderRightWidth: 1,
            borderColor: NAV_THEME.light.border,
          },
        }}
        drawerContent={() => <></>}
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
