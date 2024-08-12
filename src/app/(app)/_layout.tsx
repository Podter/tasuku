import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";

import DrawerHeader from "~/components/drawer-header";
import { useSession } from "~/hooks/use-session";
import { NAV_THEME } from "~/lib/constants";

export default function AuthLayout() {
  const { isLoading, userData } = useSession();

  if (isLoading) {
    // TODO: maybe add a loading spinner here
    return null;
  }

  if (!userData) {
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Style drawer */}
      <Drawer
        screenOptions={{
          header: (props) => <DrawerHeader {...props} />,
          drawerStyle: {
            borderRightWidth: 1,
            borderColor: NAV_THEME.dark.border,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Tasuku",
            drawerLabel: "Home",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
