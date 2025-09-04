import {useAuth} from "@/store/useAuth";
import {Stack, useRouter, useSegments} from "expo-router";
import React, {useEffect} from "react";

const AuthLayout = () => {
  const {isAuthenticated, isInitialized, otpVerified} = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && otpVerified) {
      // User is fully authenticated and verified - redirect to main app
      if (inAuthGroup) {
        router.replace("/(tabs)/home");
      }
    } else if (isAuthenticated && !otpVerified) {
      // User is authenticated but OTP not verified - redirect to OTP verification
      if (segments[1] !== "verifyOtp") {
        router.replace("/(auth)/verifyOtp");
      }
    } else if (!isAuthenticated) {
      // User is not authenticated - stay in auth flow
      // No need to redirect as we're already in auth layout
    }
  }, [isInitialized, isAuthenticated, otpVerified, segments, router]);

  // Show loading while initializing
  if (!isInitialized) {
    return null;
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
      <Stack.Screen name='verifyEmail' />
      <Stack.Screen name='accountSetup' />
    </Stack>
  );
};

export default AuthLayout;
