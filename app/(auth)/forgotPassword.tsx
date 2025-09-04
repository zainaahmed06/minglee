import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {BackIcon, MailIcon} from "@/constants/MingleeIcons";
import {functions} from "@/services/appwrite";
import {colors, spacing} from "@/theme";
import {router} from "expo-router";
import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [functionResult, setFunctionResult] = useState<any>(null);

  // Log the function result whenever it changes
  useEffect(() => {
    if (functionResult) {
      console.log("Function result updated:", functionResult);
    }
  }, [functionResult]);

  // Validate email function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  // Handle email change with validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Only validate if the field has been touched and then changed
    if (value.trim() !== "") {
      const isValid = validateEmail(value);
      console.log(isValid);
    } else {
      setEmailError(""); // Clear error when field is empty
    }
  };

  const handleForgot = async () => {
    setIsLoading(true);
    // Clear any previous errors
    setEmailError("");

    // Validate before submission
    const isValid = validateEmail(email);

    if (isValid) {
      try {
        const result = await functions.createExecution(
          "68b7d2ca00049128cf12",
          JSON.stringify({
            email: email.trim(),
            "otp-type": "reset",
          }),
          false,
          "/send-otp"
        );

        console.log("Function execution result:", result);

        // Parse the response body
        let responseData;
        try {
          responseData = JSON.parse(result.responseBody);
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          setEmailError("An error occurred. Please try again.");
          setIsLoading(false);
          return;
        }

        // Save the result to state
        setFunctionResult(responseData);

        // Check if the operation was successful
        if (responseData.success === false) {
          // Show the actual error message from the response
          setEmailError(
            responseData.message || "No account found with this email address"
          );
        } else {
          // Success - navigate to verify OTP screen with email as parameter
          router.push({
            pathname: "/(auth)/verifyOtp",
            params: {
              email: email.trim(),
              type: "reset",
            },
          });
        }
      } catch (error) {
        console.error("Error executing function:", error);
        setEmailError("An error occurred. Please try again.");
      }
    }

    setIsLoading(false);
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
          Reset your password 🔑
        </Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Input
            label='Email'
            placeholder='Enter your email'
            variant='flat'
            radius='lg'
            value={email}
            onValueChange={handleEmailChange}
            startContent={<MailIcon color={colors.textSecondary} />}
            isInvalid={!!emailError}
            errorMessage={emailError}
          />
        </View>

        {/* Continue Button */}
        <Button
          variant='solid'
          color='primary'
          fullWidth
          radius='full'
          isLoading={isLoading}
          onPress={handleForgot}
          style={styles.signinButton}>
          Continue
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
    width: "100%",
    marginBottom: 20,
  },
  inputSpacer: {
    height: 16,
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

export default ForgotPassword;
