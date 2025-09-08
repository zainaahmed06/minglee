import {LogoIcon} from "@/constants/OtherIcons";
import {useAuth} from "@/store/useAuth";
import {StreamChatWrapper} from "@/store/useStreamChat";
import {colors, spacing} from "@/theme";
import {useFonts} from "expo-font";
import {Slot} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import {ActivityIndicator, StatusBar, View} from "react-native";
import {ToastProvider} from "react-native-toast-notifications";

export default function RootLayout() {
  const {initialize, isInitialized} = useAuth();
  const [loaded] = useFonts({
    UrbanistBold: require("@/assets/fonts/UrbanistBold.ttf"),
    UrbanistMedium: require("@/assets/fonts/UrbanistMedium.ttf"),
    UrbanistRegular: require("@/assets/fonts/UrbanistRegular.ttf"),
    UrbanistSemiBold: require("@/assets/fonts/UrbanistSemiBold.ttf"),
  });

  useEffect(() => {
    initialize();

    SplashScreen.hideAsync();
  }, [initialize]);

  // Show loading while initializing
  if (!isInitialized || !loaded) {
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
      <StreamChatWrapper>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={colors.background}
        />
        <Slot
          screenOptions={{
            headerShown: false,
          }}
        />
      </StreamChatWrapper>
    </ToastProvider>
  );
}
