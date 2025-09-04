import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {BackIcon, LockIcon, MailIcon} from "@/constants/MingleeIcons";
import {functions} from "@/services/appwrite";
import {useAuth} from "@/store/useAuth";
import {colors, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useToast} from "react-native-toast-notifications";

const SignUp = () => {
  const {signUp, error, clearError} = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  // Add validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle error display with toast
  useEffect(() => {
    if (error) {
      toast.show(error.message, {
        type: "error",
        placement: "top",
        duration: 3000,
      });

      // Clear error after 3 seconds
      const timeoutId = setTimeout(() => {
        clearError();
      }, 3000);

      // Cleanup timeout if component unmounts or error changes
      return () => clearTimeout(timeoutId);
    }
  }, [error, toast, clearError]);

  // Add validation functions
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

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  // Update input change handlers
  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Only validate if the field has been touched and then changed
    if (value.trim() !== "") {
      validateEmail(value);
    } else {
      setEmailError(""); // Clear error when field is empty
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    // Only validate if the field has been touched and then changed
    if (value.trim() !== "") {
      validatePassword(value);
    } else {
      setPasswordError(""); // Clear error when field is empty
    }
  };

  // Update the checkbox change handler
  const handlePolicyChange = (newValue: boolean) => {
    setAgreeToPolicy(newValue);
  };

  const handleSignUp = async () => {
    // Validate before submission
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!agreeToPolicy) {
      toast.show("Please agree to the Privacy Policy to continue", {
        type: "warning",
        placement: "top",
        duration: 3000,
      });
      return;
    }

    if (isEmailValid && isPasswordValid && agreeToPolicy) {
      setIsLoading(true);

      try {
        // First create the user account using signUp function from useAuth
        const signUpData = {
          email: email.trim(),
          password,
        };

        await signUp(signUpData);

        // After successful account creation, send OTP for email verification
        const result = await functions.createExecution(
          "68b7d2ca00049128cf12",
          JSON.stringify({
            email: email.trim(),
            "otp-type": "signup",
          }),
          false,
          "/send-otp"
        );

        console.log("Send OTP result:", result);

        // Parse the response body
        let responseData;
        try {
          responseData = JSON.parse(result.responseBody);
        } catch (parseError) {
          console.error("Error parsing OTP response:", parseError);
          toast.show(
            "Account created but failed to send verification code. Please try again.",
            {
              type: "error",
              placement: "top",
              duration: 4000,
            }
          );
          setIsLoading(false);
          return;
        }

        // Check if OTP was sent successfully
        if (responseData.success === false) {
          toast.show(
            responseData.message || "Failed to send verification code",
            {
              type: "error",
              placement: "top",
              duration: 3000,
            }
          );
        } else {
          // Success - navigate to verify OTP screen
          toast.show("Account created! Verification code sent to your email", {
            type: "success",
            placement: "top",
            duration: 2000,
          });

          router.push({
            pathname: "/(auth)/verifyOtp",
            params: {
              email: email.trim(),
              type: "signup",
            },
          });
        }
      } catch (error: any) {
        console.error("Error during signup process:", error);

        // Handle specific signup errors
        if (
          error.message?.includes("email") &&
          error.message?.includes("exists")
        ) {
          toast.show(
            "Email already exists. Please use a different email or sign in.",
            {
              type: "error",
              placement: "top",
              duration: 4000,
            }
          );
        } else {
          toast.show("An error occurred during signup. Please try again.", {
            type: "error",
            placement: "top",
            duration: 3000,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Implement social sign up logic here
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
            onValueChange={handleEmailChange}
            startContent={<MailIcon color={colors.textSecondary} />}
            isInvalid={!!emailError}
            errorMessage={emailError}
          />

          <View style={styles.inputSpacer} />

          <Input
            label='Password'
            placeholder='Password'
            variant='flat'
            radius='lg'
            type='password'
            value={password}
            onValueChange={handlePasswordChange}
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
            isInvalid={!!passwordError}
            errorMessage={passwordError}
          />
        </View>

        {/* Terms & Privacy Policy */}
        <View style={styles.forgotPasswordRow}>
          {/* Privacy Policy Checkbox */}
          <View style={styles.checkboxContainer}>
            <Pressable
              style={styles.checkbox}
              onPress={() => handlePolicyChange(!agreeToPolicy)}>
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

        {/* Sign Up Button */}
        <Button
          variant='solid'
          color='primary'
          fullWidth
          radius='full'
          isLoading={isLoading}
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

        {/* Sign In Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, {color: colors.textSecondary}]}>
            Already have an account ?{" "}
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

// Styles remain the same
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
