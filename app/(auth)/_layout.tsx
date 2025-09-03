import {useAuth} from "@/store/useAuth";
import {Redirect, Stack} from "expo-router";
import React from "react";

const AuthLayout = () => {
  const {user, isAuthenticated, isInitialized} = useAuth();

  // Show loading while initializing
  if (!isInitialized) {
    return null;
  }

  // If user is authenticated, redirect to tabs
  if (isAuthenticated) {
    return <Redirect href='/(tabs)/home' />;
  }

  return (
    <Stack
      initialRouteName='firstOnboarding'
      screenOptions={{headerShown: false, animation: "fade_from_bottom"}}>
      <Stack.Screen name='firstOnboarding' />
      <Stack.Screen name='secondOnboarding' />
      <Stack.Screen name='thirdOnboarding' />
      <Stack.Screen name='welcome' />
      <Stack.Screen name='signin' />
      <Stack.Screen name='signup' />
      <Stack.Screen name='forgotPassword' />
      <Stack.Screen name='resetPassword' />
      <Stack.Screen name='verifyOtp' />
      <Stack.Screen name='accountSetup' />
    </Stack>
  );
};

export default AuthLayout;
