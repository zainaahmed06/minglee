import {Stack} from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack initialRouteName='welcome' screenOptions={{headerShown: false}}>
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
