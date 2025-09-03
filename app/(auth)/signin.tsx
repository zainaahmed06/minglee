import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {BackIcon, LockIcon, MailIcon} from "@/constants/MingleeIcons";
import {useAuth} from "@/store/useAuth";
import {colors, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useToast} from "react-native-toast-notifications";

const SignIn = () => {
  const {signIn, error, clearError} = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle error display with toast
  useEffect(() => {
    if (error) {
      toast.show(error.message, {
        type: "danger",
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

  // Validation functions
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

  // Input change handlers
  const handleEmailChange = (value: string) => {
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePassword(value);
  };

  const handleSignIn = async () => {
    // Validate one more time before submission
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      const data = {
        email,
        password,
      };
      setIsLoading(true);

      try {
        await signIn(data);
      } catch (error) {
        // Error will be handled by the useEffect hook
        console.log("Sign in error caught:", error);
      } finally {
        setIsLoading(false);
      }
    }
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
        <BackIcon color={colors.text} size={24} />
      </Pressable>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Header */}
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
        {/* Forgot Password */}
        <View style={styles.forgotPasswordRow}>
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
          isLoading={isLoading}
          onPress={handleSignIn}
          style={styles.signinButton}>
          Sign In
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

// styles remain the same
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
    justifyContent: "flex-end",
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
