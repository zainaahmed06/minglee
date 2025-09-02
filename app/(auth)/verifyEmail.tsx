import Button from "@/components/Button";
import {BackIcon} from "@/constants/MingleeIcons";
import {useAuth} from "@/store/useAuth";
import {colors, fontSizes, spacing} from "@/theme";
import {useRouter} from "expo-router";
import LottieView from "lottie-react-native";
import React, {useState} from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
const VerifyEmail = () => {
  const router = useRouter();
  const {user, resendEmailVerification, refreshProfile, signOut} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Handle resend email verification
  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      await resendEmailVerification();
      // Show success or handle accordingly
    } catch (error) {
      // Handle error
      console.error("Failed to resend verification email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "I've verified my email" button
  const handleVerifiedEmail = async () => {
    try {
      setIsLoading(true);
      // Refresh user profile to check if email has been verified
      refreshProfile();

      if (user?.emailVerification) {
        // If verified, proceed to the next screen
        router.push("/(tabs)/home");
      } else {
        Alert.alert(
          "Verification Failed",
          "You have not yet verified the email ."
        );
      }
    } catch (error) {
      // Handle error
      console.error("Failed to check email verification status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to mask the email for privacy
  const maskEmail = (email: string) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    if (!username || !domain) return email;

    const maskedUsername =
      username.charAt(0) +
      "*".repeat(Math.min(username.length - 2, 8)) +
      username.charAt(username.length - 1);

    return `${maskedUsername}@${domain}`;
  };

  const handleBack = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoading(true);
            await signOut();
            router.push("/(auth)/signup");
          } catch (error) {
            console.error("Failed to log out:", error);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={handleBack}>
        <BackIcon color={colors.text} size={24} />
      </Pressable>
      <View style={styles.content}>
        <LottieView
          style={styles.lottie}
          source={require("../../lotties/Email.json")}
          autoPlay
          loop
        />

        <Text style={styles.heading}>Check Your Email</Text>

        <Text style={styles.message}>
          We have sent an email to{"\n"}
          <Text style={styles.emailText}>{maskEmail(user?.email || "")}</Text>.
          {"\n"}
          Click the link inside to get started.
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          onPress={handleVerifiedEmail}
          isLoading={isLoading}
          color='primary'
          radius='full'
          fullWidth>
          I&apos;ve verified my email
        </Button>
        <Button
          variant='faded'
          onPress={handleResendEmail}
          isLoading={isLoading}
          color='primary'
          radius='full'
          fullWidth>
          Resend Email
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    paddingHorizontal: spacing.lg,
  },
  // Header back button is now managed by Stack.Screen
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  heading: {
    fontSize: fontSizes.xxxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  message: {
    fontSize: fontSizes.lg,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: fontSizes.lg * 1.5,
  },
  emailText: {
    fontWeight: "700",
  },
  resendLink: {
    fontSize: fontSizes.lg,
    color: colors.primary,
    fontWeight: "600",
    marginTop: spacing.md,
  },
  bottomContainer: {
    flexDirection: "column",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xxxl + 150,
  },
});

export default VerifyEmail;
