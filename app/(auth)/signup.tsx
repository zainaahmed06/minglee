import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {BackIcon, LockIcon, MailIcon} from "@/constants/MingleeIcons";
import {colors, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  const handleSignUp = () => {
    // Implement sign in logic here
    console.log("Sign in with:", {email, password});
  };

  const handleSocialSignUp = (provider: string) => {
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
        <BackIcon color={colors.text} size={24} />
      </Pressable>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Header */}
        <Text style={[styles.heading, {color: colors.text}]}>
          Create an account 👩‍💻
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
            startContent={<MailIcon color={colors.textSecondary} />}
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
            secureTextEntry={isPasswordHidden}
            startContent={<LockIcon color={colors.textSecondary} />}
            endContent={
              <Ionicons
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                name={isPasswordHidden ? "eye-off" : "eye"}
                size={24}
                color={colors.textSecondary}
              />
            }
          />
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={styles.forgotPasswordRow}>
          {/* Remember Me Checkbox */}
          <View style={styles.checkboxContainer}>
            <Pressable
              style={styles.checkbox}
              onPress={() => setAgreeToPolicy(!agreeToPolicy)}>
              <View
                style={[
                  styles.checkboxInner,
                  {
                    backgroundColor: agreeToPolicy
                      ? colors.primary
                      : "transparent",
                    borderColor: agreeToPolicy ? colors.primary : colors.border,
                  },
                ]}>
                {agreeToPolicy && (
                  <Text style={{color: "#fff", fontSize: 12}}>✓</Text>
                )}
              </View>
            </Pressable>
            <Text style={[styles.checkboxLabel, {color: colors.text}]}>
              I agree to Datify Privacy Policy.
            </Text>
          </View>
        </View>
        {/* Sign In Button */}
        <Button
          variant='solid'
          color='primary'
          fullWidth
          radius='full'
          onPress={handleSignUp}
          style={styles.signinButton}>
          Sign Up
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
            onPress={() => handleSocialSignUp("Facebook")}>
            <Ionicons name='logo-facebook' size={24} color={colors.primary} />
          </Pressable>

          <Pressable
            style={[styles.socialButton, {borderColor: colors.border}]}
            onPress={() => handleSocialSignUp("Google")}>
            <Ionicons name='logo-google' size={24} color={colors.primary} />
          </Pressable>

          <Pressable
            style={[styles.socialButton, {borderColor: colors.border}]}
            onPress={() => handleSocialSignUp("Apple")}>
            <Ionicons name='logo-apple' size={24} color={colors.primary} />
          </Pressable>
        </View>
        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, {color: colors.textSecondary}]}>
            Already have an account ?{" "}
          </Text>
          <Pressable onPress={() => router.push("/(auth)/signup")}>
            <Text style={[styles.signupLink, {color: colors.primary}]}>
              Sign In
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
  forgotPasswordRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
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

export default SignUp;
