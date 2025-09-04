import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import {BackIcon} from "@/constants/MingleeIcons";
import {functions} from "@/services/appwrite";
import {useAuth} from "@/store/useAuth";
import {colors, fontSizes, spacing} from "@/theme";
import {router, useLocalSearchParams} from "expo-router";
import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useLocalSearchParams();
  const email = params.email as string;
  const otpType = params.type as string;
  const {setOtpVerified} = useAuth();

  // Check if required parameters exist
  useEffect(() => {
    if (!email) {
      setError("Email parameter missing. Please go back and try again.");
    } else if (!otpType) {
      setError("Verification type missing. Please go back and try again.");
    } else if (!["signin", "signup", "reset"].includes(otpType)) {
      setError("Invalid verification type. Please go back and try again.");
    }
  }, [email, otpType]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleResendOtp = async () => {
    if (!email || !otpType) {
      setError(
        "Email or verification type not found. Please go back and try again."
      );
      return;
    }

    try {
      setError(""); // Clear any existing errors

      const result = await functions.createExecution(
        "68b7d2ca00049128cf12",
        JSON.stringify({
          email: email.trim(),
          otp_type: otpType,
        }),
        false,
        "/send-otp"
      );

      console.log("Resend OTP result:", result);

      let responseData;
      try {
        responseData = JSON.parse(result.responseBody);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        setError("An error occurred while resending verification code.");
        return;
      }

      if (responseData.success === false) {
        setError(responseData.message || "Failed to resend verification code.");
      } else {
        // Show success message
        console.log("OTP resent successfully");
        setError(""); // Clear any existing errors
        // You could show a success toast here if available
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError("An error occurred while resending verification code.");
    }
  };

  const handleVerify = async () => {
    if (!otp || otp.length !== 5) {
      setError("Please enter a valid 5-digit verification code");
      return;
    }

    if (!email || !otpType) {
      setError(
        "Missing email or verification type. Please go back and try again."
      );
      return;
    }

    setIsLoading(true);
    setError(""); // Clear error when we're about to make a request

    try {
      const result = await functions.createExecution(
        "68b7d2ca00049128cf12",
        JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
          otp_type: otpType,
        }),
        false,
        "/verify-otp"
      );

      console.log("OTP verification result:", result);

      // Parse the response body
      let responseData;
      try {
        responseData = JSON.parse(result.responseBody);
      } catch (parseError) {
        console.error("Error parsing verification response:", parseError);
        setError("An error occurred during verification. Please try again.");
        setIsLoading(false);
        return;
      }

      // Check if the verification was successful
      if (responseData.success === false) {
        // Show the actual error message from the response
        setError(
          responseData.message || "Invalid verification code. Please try again."
        );
      } else {
        // Verification successful - route based on OTP type
        console.log("OTP verification successful for type:", otpType);

        if (otpType === "reset") {
          // Navigate to reset password screen with email parameter
          router.push({
            pathname: "/(auth)/resetPassword",
            params: {email: email.trim()},
          });
        } else if (otpType === "signin") {
          // Set OTP verified status and navigate to home/main app
          setOtpVerified(true);
          router.replace("/(tabs)/home");
        } else if (otpType === "signup") {
          // Set OTP verified status and navigate to onboarding for new users
          setOtpVerified(true);
        } else {
          // Default fallback to reset password flow
          console.warn(
            "Unknown OTP type:",
            otpType,
            "- defaulting to reset flow"
          );
          router.push({
            pathname: "/(auth)/resetPassword",
            params: {email: email.trim()},
          });
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred during verification. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            onValueChange={handleOtpChange}
            codeLength={5}
            onInputComplete={(code: string) =>
              console.log("Verification code entered:", code)
            }
            containerStyle={styles.otpContainer}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Verify OTP */}
        <View style={styles.forgotPasswordRow}>
          {/* Resend Code Link */}
          <Pressable onPress={handleResendOtp}>
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
          isLoading={isLoading}
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
  errorText: {
    color: colors.danger,
    fontSize: fontSizes.sm,
    marginTop: spacing.sm,
    textAlign: "center",
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
