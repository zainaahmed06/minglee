import Button from "@/components/Button";
import {LogoIcon} from "@/constants/OtherIcons";
import {colors, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Welcome = () => {
  const handleSignIn = () => {
    router.push("/(auth)/signin");
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`);
    // Implement social authentication logic here
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: colors.background, paddingHorizontal: spacing.md},
      ]}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name='chevron-back' size={24} color={colors.text} />
      </Pressable>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Welcome Image */}
        <View style={styles.imageContainer}>
          <LogoIcon size={200} />
        </View>

        {/* Welcome Text */}
        <Text style={[styles.welcomeText, {color: colors.text}]}>
          Let{"'"}s dive in into your account!
        </Text>

        {/* Social Login Buttons */}
        <View style={styles.socialButtons}>
          <Button
            variant='faded'
            color='default'
            fullWidth
            radius='lg'
            onPress={() => handleSocialSignIn("Facebook")}
            startContent={
              <View style={styles.socialIconContainer}>
                <Ionicons
                  name='logo-facebook'
                  size={18}
                  color={colors.primary}
                />
              </View>
            }>
            Continue with Facebook
          </Button>

          <View style={styles.buttonSpacer} />

          <Button
            variant='faded'
            color='default'
            fullWidth
            radius='lg'
            onPress={() => handleSocialSignIn("Google")}
            startContent={
              <View style={styles.socialIconContainer}>
                <Ionicons name='logo-google' size={18} color={colors.primary} />
              </View>
            }>
            Continue with Google
          </Button>

          <View style={styles.buttonSpacer} />

          <Button
            variant='faded'
            color='default'
            fullWidth
            radius='lg'
            onPress={() => handleSocialSignIn("Apple")}
            startContent={
              <View style={styles.socialIconContainer}>
                <Ionicons name='logo-apple' size={18} color={colors.primary} />
              </View>
            }>
            Continue with Apple
          </Button>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={[styles.divider, {backgroundColor: colors.border}]} />
          <Text style={[styles.dividerText, {color: colors.textSecondary}]}>
            or
          </Text>
          <View style={[styles.divider, {backgroundColor: colors.border}]} />
        </View>

        {/* Sign in with Password Button */}
        <Button
          variant='solid'
          color='primary'
          fullWidth
          radius='full'
          onPress={handleSignIn}>
          Sign In
        </Button>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, {color: colors.textSecondary}]}>
            Don{"'"}t have an account ?{" "}
          </Text>
          <Pressable onPress={handleSignUp}>
            <Text style={[styles.signupLink, {color: colors.primary}]}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 40,
  },
  socialButtons: {
    width: "100%",
    marginBottom: 24,
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSpacer: {
    height: 16,
  },
  dividerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Welcome;
