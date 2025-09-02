import {Stack} from "expo-router";
import React from "react";

const AuthLayout = () => {
  // const {user, isAuthenticated, isInitialized} = useAuth();

  // // Show loading while initializing
  // if (!isInitialized) {
  //   return null;
  // }

  // // If user is authenticated, redirect to tabs
  // if (isAuthenticated && user?.emailVerification) {
  //   return <Redirect href='/(tabs)/home' />;
  // }

  return (
    <Stack initialRouteName='accountSetup' screenOptions={{headerShown: false}}>
      <Stack.Screen name='onboarding' />
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
