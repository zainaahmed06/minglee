import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {BackIcon, LockIcon} from "@/constants/MingleeIcons";
import {colors, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  // Validation states
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Password validation
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      setPasswordError(
        "Password must include both uppercase and lowercase letters"
      );
      return false;
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordError("Password must include at least one number");
      return false;
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordError(
        "Password must include at least one special character (!@#$%^&*)"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  // Confirm password validation
  const validateConfirmPassword = (confirmPass: string, pass: string) => {
    if (!confirmPass) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    } else if (confirmPass !== pass) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  // Handle password change
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.trim() !== "") {
      validatePassword(value);
      // If confirm password already has a value, validate it again
      if (confirmPassword) {
        validateConfirmPassword(confirmPassword, value);
      }
    } else {
      setPasswordError("");
    }
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value.trim() !== "") {
      validateConfirmPassword(value, password);
    } else {
      setConfirmPasswordError("");
    }
  };

  // Handle form submission
  const handleResetPassword = () => {
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(
      confirmPassword,
      password
    );

    if (isPasswordValid && isConfirmPasswordValid) {
      console.log("Password reset successful:", {password});
      // Navigate to success screen or login
      router.push("/(auth)/signin");
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
          Create new password 🔒
        </Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Input
            label='Password'
            placeholder='Enter new password'
            variant='flat'
            radius='lg'
            secureTextEntry={isPasswordHidden}
            value={password}
            onValueChange={handlePasswordChange}
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

          <View style={styles.inputSpacer} />

          <Input
            label='Confirm Password'
            placeholder='Confirm new password'
            variant='flat'
            radius='lg'
            secureTextEntry={isConfirmPasswordHidden}
            value={confirmPassword}
            onValueChange={handleConfirmPasswordChange}
            startContent={<LockIcon color={colors.textSecondary} />}
            endContent={
              <Ionicons
                onPress={() =>
                  setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                }
                name={isConfirmPasswordHidden ? "eye-off" : "eye"}
                size={24}
                color={colors.textSecondary}
              />
            }
            isInvalid={!!confirmPasswordError}
            errorMessage={confirmPasswordError}
          />
        </View>

        {/* Password Requirements */}
        <View style={styles.requirementsContainer}>
          <Text style={[styles.requirementsTitle, {color: colors.text}]}>
            Password must contain:
          </Text>
          <Text
            style={[
              styles.requirementItem,
              {
                color:
                  password.length >= 8 ? colors.success : colors.textSecondary,
              },
            ]}>
            • At least 8 characters
          </Text>
          <Text
            style={[
              styles.requirementItem,
              {
                color: /(?=.*[a-z])(?=.*[A-Z])/.test(password)
                  ? colors.success
                  : colors.textSecondary,
              },
            ]}>
            • Uppercase and lowercase letters
          </Text>
          <Text
            style={[
              styles.requirementItem,
              {
                color: /(?=.*\d)/.test(password)
                  ? colors.success
                  : colors.textSecondary,
              },
            ]}>
            • At least one number
          </Text>
          <Text
            style={[
              styles.requirementItem,
              {
                color: /(?=.*[!@#$%^&*])/.test(password)
                  ? colors.success
                  : colors.textSecondary,
              },
            ]}>
            • At least one special character (!@#$%^&*)
          </Text>
        </View>

        {/* Continue Button */}
        <Button
          variant='solid'
          color='primary'
          fullWidth
          radius='full'
          onPress={handleResetPassword}
          style={styles.resetButton}>
          Reset Password
        </Button>

        {/* Sign In Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, {color: colors.textSecondary}]}>
            Remember Password?{" "}
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
  requirementsContainer: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 14,
    marginBottom: 4,
    paddingLeft: 4,
  },
  resetButton: {
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

export default ResetPassword;
