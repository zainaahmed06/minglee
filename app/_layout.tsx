import {LogoIcon} from "@/constants/OtherIcons";
import {useAuth} from "@/store/useAuth";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import {Text, View} from "react-native";

export default function RootLayout() {
  const {initialize, isInitialized} = useAuth();

  useEffect(() => {
    initialize();

    SplashScreen.hideAsync();
  }, [initialize]);

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Good to see you</Text>
        <LogoIcon size={120} />
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
