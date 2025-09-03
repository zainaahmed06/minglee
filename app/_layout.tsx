import {LogoIcon} from "@/constants/OtherIcons";
import {useAuth} from "@/store/useAuth";
import {colors, spacing} from "@/theme";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import {ActivityIndicator, View} from "react-native";

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
    <Stack
      initialRouteName='(auth)'
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
