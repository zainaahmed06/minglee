import {LogoIcon} from "@/constants/OtherIcons";
import {useAuth} from "@/store/useAuth";
import {colors, spacing} from "@/theme";
import {Slot} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import {ActivityIndicator, StatusBar, View} from "react-native";
import {ToastProvider} from "react-native-toast-notifications";

export default function RootLayout() {
  const {initialize, isInitialized} = useAuth();

  useEffect(() => {
    initialize();

    SplashScreen.hideAsync();
  }, [initialize]);

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: spacing.md,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <LogoIcon size={120} />
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }
  return (
    <ToastProvider
      offset={50} // offset for both top and bottom toasts
      offsetTop={50}
      offsetBottom={50}
      swipeEnabled={true}
      placement='top'
      duration={5000}
      animationType='zoom-in'
      animationDuration={250}
      successColor={colors.success}
      dangerColor={colors.danger}
      warningColor={colors.warning}
      normalColor={colors.backgroundSecondary}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={colors.background}
      />
      <Slot
        screenOptions={{
          headerShown: false,
        }}
      />
    </ToastProvider>
  );
}
