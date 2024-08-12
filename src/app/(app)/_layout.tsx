import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";

import DrawerHeader from "~/components/drawer-header";
import { useSession } from "~/hooks/use-session";

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
      <Drawer
        screenOptions={{
          header: (props) => <DrawerHeader {...props} />,
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
