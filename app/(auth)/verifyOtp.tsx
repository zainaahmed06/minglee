import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import {BackIcon} from "@/constants/MingleeIcons";
import {colors, fontSizes, spacing} from "@/theme";
import {router} from "expo-router";
import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Simulate successful verification
    router.push("/(auth)/resetPassword");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: colors.background, paddingHorizontal: spacing.md},
      ]}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <BackIcon color={colors.text} />
      </Pressable>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Header */}
        <Text style={[styles.heading, {color: colors.text}]}>
          OTP code verification 🔐
        </Text>

        {/* OTP Input Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter verification code</Text>
          <OtpInput
            value={otp}
            onValueChange={setOtp}
            codeLength={5}
            onInputComplete={(code: string) =>
              console.log("Verification code entered:", code)
            }
            containerStyle={styles.otpContainer}
          />
        </View>

        {/* Verify OTP */}
        <View style={styles.forgotPasswordRow}>
          {/* Forgot Password Link */}
          <Pressable onPress={() => router.push("/(auth)/forgotPassword")}>
            <Text style={[styles.forgotPasswordLink, {color: colors.primary}]}>
              Resend Code ?
            </Text>
          </Pressable>
        </View>

        {/* Continue Button */}
        <Button
          variant='solid'
          color='primary'
          fullWidth
          radius='full'
          onPress={handleVerify}
          style={styles.signinButton}>
          Verify & Continue
        </Button>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, {color: colors.textSecondary}]}>
            Remember Password ?{" "}
          </Text>
          <Pressable onPress={() => router.push("/(auth)/signin")}>
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: fontSizes.md,
    fontWeight: "500",
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  otpContainer: {
    marginVertical: spacing.md,
    alignItems: "center",
  },
  inputSpacer: {
    height: 16,
  },
  forgotPasswordRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 20,
  },
  forgotPasswordLink: {
    fontSize: 14,
    fontWeight: "500",
  },
  signinButton: {
    marginVertical: 20,
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

export default VerifyOtp;
