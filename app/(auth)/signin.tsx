import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {colors, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    // Implement sign in logic here
    console.log("Sign in with:", {email, password, rememberMe});
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`);
    // Implement social sign in logic here
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
        {/* Header */}{" "}
        <Text style={[styles.heading, {color: colors.text}]}>
          Welcome back 👋
        </Text>
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Input
            label='Email'
            placeholder='Email'
            variant='flat'
            radius='lg'
            value={email}
            onValueChange={setEmail}
            startContent={
              <View style={styles.inputIcon}>
                <Ionicons
                  name='mail-outline'
                  size={22}
                  color={colors.textSecondary}
                />
              </View>
            }
          />

          <View style={styles.inputSpacer} />

          <Input
            label='Password'
            placeholder='Password'
            variant='flat'
            radius='lg'
            type='password'
            value={password}
            onValueChange={setPassword}
            startContent={
              <View style={styles.inputIcon}>
                <Ionicons
                  name='lock-closed-outline'
                  size={22}
                  color={colors.textSecondary}
                />
              </View>
            }
            endContent={
              <Pressable>
                <Text style={{color: colors.textSecondary}}>👁️</Text>
              </Pressable>
            }
          />
        </View>
        {/* Remember Me & Forgot Password */}
        <View style={styles.forgotPasswordRow}>
          {/* Remember Me Checkbox */}
          <View style={styles.checkboxContainer}>
            <Pressable
              style={styles.checkbox}
              onPress={() => setRememberMe(!rememberMe)}>
              <View
                style={[
                  styles.checkboxInner,
                  {
                    backgroundColor: rememberMe
                      ? colors.primary
                      : "transparent",
                    borderColor: rememberMe ? colors.primary : colors.border,
                  },
                ]}>
                {rememberMe && (
                  <Text style={{color: "#fff", fontSize: 12}}>✓</Text>
                )}
              </View>
            </Pressable>
            <Text style={[styles.checkboxLabel, {color: colors.text}]}>
              Remember me
            </Text>
          </View>

          {/* Forgot Password Link */}
          <Pressable onPress={() => router.push("/(auth)/forgotPassword")}>
            <Text style={[styles.forgotPasswordLink, {color: colors.primary}]}>
              Forgot password ?
            </Text>
          </Pressable>
        </View>
        {/* Sign In Button */}
        <Button
          variant='solid'
          color='primary'
          fullWidth
          radius='full'
          onPress={handleSignIn}
          style={styles.signinButton}>
          Sign in
        </Button>
        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={[styles.divider, {backgroundColor: colors.border}]} />
          <Text style={[styles.dividerText, {color: colors.textSecondary}]}>
            or continue with
          </Text>
          <View style={[styles.divider, {backgroundColor: colors.border}]} />
        </View>
        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <Pressable
            style={[styles.socialButton, {borderColor: colors.border}]}
            onPress={() => handleSocialSignIn("Facebook")}>
            <Ionicons name='logo-facebook' size={24} color={colors.primary} />
          </Pressable>

          <Pressable
            style={[styles.socialButton, {borderColor: colors.border}]}
            onPress={() => handleSocialSignIn("Google")}>
            <Ionicons name='logo-google' size={24} color={colors.primary} />
          </Pressable>

          <Pressable
            style={[styles.socialButton, {borderColor: colors.border}]}
            onPress={() => handleSocialSignIn("Apple")}>
            <Ionicons name='logo-apple' size={24} color={colors.primary} />
          </Pressable>
        </View>
        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, {color: colors.textSecondary}]}>
            Don&apos;t have an account ?{" "}
          </Text>
          <Pressable onPress={() => router.push("/(auth)/signup")}>
            <Text style={[styles.signupLink, {color: colors.primary}]}>
              Sign up
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
    paddingTop: 80,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputSpacer: {
    height: 16,
  },
  inputIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  forgotPasswordLink: {
    fontSize: 14,
    fontWeight: "500",
  },
  signinButton: {
    marginVertical: 20,
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
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
  },
  socialIcon: {
    fontSize: 24,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 40,
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

export default SignIn;
