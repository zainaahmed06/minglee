import Button from "@/components/Button";
import {useAuth} from "@/store/useAuth";
import React, {useEffect, useState} from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

/**
 * AuthExample - A comprehensive example showing how to use the useAuth hook
 *
 * This example demonstrates:
 * 1. Authentication state management
 * 2. Email/password sign up and sign in
 * 3. OAuth authentication with providers
 * 4. Password reset flow
 * 5. User profile management
 * 6. Email verification
 * 7. Error handling
 */
export default function AuthExample() {
  // Get auth state and functions from the useAuth hook
  const auth = useAuth();

  // Form state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("status");

  // This will initialize the auth state on component mount
  useEffect(() => {
    if (!auth.isInitialized) {
      auth.initialize();
    }
  }, [auth]);

  // Listen for deep links (for OAuth callbacks)
  useEffect(() => {
    // Handle deep link for OAuth completion
    const handleDeepLink = async ({url}: {url: string}) => {
      if (url && url.includes("oauth-callback")) {
        try {
          await auth.completeOAuthLogin(url);
          Alert.alert("Success", "OAuth login successful");
        } catch (error: any) {
          Alert.alert(
            "OAuth Error",
            error.message || "Failed to complete OAuth authentication"
          );
        }
      }
    };

    // Set up deep link listener
    const linkingListener = Linking.addEventListener("url", handleDeepLink);

    // Check if app was opened with a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({url});
      }
    });

    return () => {
      linkingListener.remove();
    };
  }, [auth]);

  // Sign up with email and password
  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      return Alert.alert("Error", "Please fill all fields");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      await auth.signUp({
        email,
        password,
      });

      Alert.alert("Success", "Account created successfully");
      setActiveSection("profile");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Sign Up Error",
        auth.error?.message || "Failed to create account"
      );
    }
  };

  // Sign in with email and password
  const handleSignIn = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter email and password");
    }

    try {
      await auth.signIn({
        email,
        password,
      });

      Alert.alert("Success", "Signed in successfully");
      setActiveSection("profile");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Sign In Error", auth.error?.message || "Failed to sign in");
    }
  };

  // Sign out the user
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      Alert.alert("Success", "Signed out successfully");
      setActiveSection("status");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Sign Out Error",
        auth.error?.message || "Failed to sign out"
      );
    }
  };

  // Password reset flow - Step 1: Send recovery email
  const handleForgotPassword = async () => {
    if (!email) {
      return Alert.alert("Error", "Please enter your email address");
    }

    try {
      await auth.forgotPassword({email});
      Alert.alert(
        "Success",
        "Password reset email sent. Please check your inbox."
      );
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Password Reset Error",
        auth.error?.message || "Failed to send recovery email"
      );
    }
  };

  // Update user's name
  const handleUpdateName = async () => {
    if (!name) {
      return Alert.alert("Error", "Please enter a name");
    }

    try {
      await auth.updateName({name});
      Alert.alert("Success", "Name updated successfully");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Update Error",
        auth.error?.message || "Failed to update name"
      );
    }
  };

  // Update user's password
  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      return Alert.alert(
        "Error",
        "Please enter your new password and confirmation"
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      await auth.updatePassword({
        password,
        oldPassword: "", // In a real app, you should collect the old password
      });
      Alert.alert("Success", "Password updated successfully");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Update Error",
        auth.error?.message || "Failed to update password"
      );
    }
  };

  // Send email verification
  const handleSendVerification = async () => {
    try {
      await auth.sendEmailVerification();
      Alert.alert(
        "Success",
        "Verification email sent. Please check your inbox."
      );
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Verification Error",
        auth.error?.message || "Failed to send verification email"
      );
    }
  };

  // OAuth sign in with a provider
  const handleOAuthSignIn = async (
    provider: "google" | "facebook" | "apple"
  ) => {
    try {
      // For mobile apps, you typically need to handle the redirect URL differently
      // This is just a simplified example
      const redirectUrl = await auth.createOAuthSession({
        provider,
        redirectUrl: "mingleeapp://auth/oauth-callback", // Your app's deep link scheme
      });

      // In a real app, you'd need to handle the OAuth flow according to your platform
      // On web, you'd redirect the user to the URL
      // On mobile, you'd use a WebView or the platform's OAuth APIs
      if (Platform.OS === "web") {
        window.location.href = redirectUrl;
      } else {
        // For native apps, you'd open the URL in the browser or use a WebView
        await Linking.openURL(redirectUrl);
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "OAuth Error",
        auth.error?.message || `Failed to initiate ${provider} sign-in`
      );
    }
  };

  // Refresh user profile data
  const handleRefreshProfile = async () => {
    try {
      await auth.refreshProfile();
      Alert.alert("Success", "Profile refreshed successfully");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Refresh Error",
        auth.error?.message || "Failed to refresh profile"
      );
    }
  };

  // Clear any authentication errors
  const handleClearError = () => {
    auth.clearError();
    Alert.alert("Success", "Errors cleared");
  };

  // Render the current auth state section
  const renderAuthStatus = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Authentication Status</Text>
        <View style={styles.statusItem}>
          <Text style={styles.label}>Is Authenticated:</Text>
          <Text style={styles.value}>
            {auth.isAuthenticated ? "Yes" : "No"}
          </Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.label}>Is Loading:</Text>
          <Text style={styles.value}>{auth.isLoading ? "Yes" : "No"}</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.label}>Is Initialized:</Text>
          <Text style={styles.value}>{auth.isInitialized ? "Yes" : "No"}</Text>
        </View>
        {auth.error && (
          <View style={styles.statusItem}>
            <Text style={styles.label}>Error:</Text>
            <Text style={[styles.value, styles.errorText]}>
              {auth.error.message}
            </Text>
          </View>
        )}
        {auth.isAuthenticated && (
          <>
            <View style={styles.statusItem}>
              <Text style={styles.label}>User ID:</Text>
              <Text style={styles.value}>{auth.user?.$id}</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{auth.userEmail}</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{auth.userName || "Not set"}</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.label}>Email Verified:</Text>
              <Text style={styles.value}>
                {auth.isEmailVerified ? "Yes" : "No"}
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };

  // Render the sign up form
  const renderSignUpForm = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button onPress={handleSignUp} style={styles.button}>
          Sign Up
        </Button>
        <Button
          onPress={() => setActiveSection("signIn")}
          variant='light'
          style={styles.button}>
          Already have an account? Sign In
        </Button>
      </View>
    );
  };

  // Render the sign in form
  const renderSignInForm = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={handleSignIn} style={styles.button}>
          Sign In
        </Button>
        <Button
          onPress={() => setActiveSection("signUp")}
          variant='light'
          style={styles.button}>
          Create Account
        </Button>
        <Button
          onPress={() => setActiveSection("forgotPassword")}
          variant='ghost'
          style={styles.button}>
          Forgot Password?
        </Button>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.sectionSubtitle}>Sign in with</Text>
        <View style={styles.socialButtons}>
          <Button
            onPress={() => handleOAuthSignIn("google")}
            variant='bordered'
            color='primary'
            style={styles.socialButton}>
            Google
          </Button>
          <Button
            onPress={() => handleOAuthSignIn("facebook")}
            variant='bordered'
            color='primary'
            style={styles.socialButton}>
            Facebook
          </Button>
          <Button
            onPress={() => handleOAuthSignIn("apple")}
            variant='bordered'
            color='primary'
            style={styles.socialButton}>
            Apple
          </Button>
        </View>
      </View>
    );
  };

  // Render the forgot password form
  const renderForgotPasswordForm = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Forgot Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <Button onPress={handleForgotPassword} style={styles.button}>
          Reset Password
        </Button>
        <Button
          onPress={() => setActiveSection("signIn")}
          variant='light'
          style={styles.button}>
          Back to Sign In
        </Button>
      </View>
    );
  };

  // Render the user profile section
  const renderProfileSection = () => {
    if (!auth.isAuthenticated) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.emptyStateText}>
            Please sign in to view your profile
          </Text>
          <Button
            onPress={() => setActiveSection("signIn")}
            style={styles.button}>
            Sign In
          </Button>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Profile</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{auth.user?.$id}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{auth.user?.email}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{auth.user?.name || "Not set"}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Email Verified:</Text>
          <Text style={styles.value}>
            {auth.user?.emailVerification ? "Yes" : "No"}
          </Text>
        </View>

        <Text style={styles.sectionSubtitle}>Update Profile</Text>
        <TextInput
          style={styles.input}
          placeholder='New Name'
          value={name}
          onChangeText={setName}
        />
        <Button onPress={handleUpdateName} style={styles.button}>
          Update Name
        </Button>

        <Text style={styles.sectionSubtitle}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder='New Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder='Confirm New Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button onPress={handleUpdatePassword} style={styles.button}>
          Update Password
        </Button>

        {!auth.user?.emailVerification && (
          <>
            <Text style={styles.sectionSubtitle}>Email Verification</Text>
            <Button onPress={handleSendVerification} style={styles.button}>
              Send Verification Email
            </Button>
          </>
        )}

        <Text style={styles.sectionSubtitle}>Account Actions</Text>
        <Button
          onPress={handleRefreshProfile}
          variant='light'
          style={styles.button}>
          Refresh Profile
        </Button>
        <Button onPress={handleSignOut} variant='ghost' style={styles.button}>
          Sign Out
        </Button>
      </View>
    );
  };

  // Main render method
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Auth Example</Text>

      {/* Navigation tabs */}
      <View style={styles.tabs}>
        <Button
          onPress={() => setActiveSection("status")}
          variant={activeSection === "status" ? "solid" : "light"}
          color='primary'
          style={styles.tabButton}>
          Status
        </Button>
        <Button
          onPress={() => setActiveSection("signIn")}
          variant={activeSection === "signIn" ? "solid" : "light"}
          color='primary'
          style={styles.tabButton}>
          Sign In
        </Button>
        <Button
          onPress={() => setActiveSection("signUp")}
          variant={activeSection === "signUp" ? "solid" : "light"}
          color='primary'
          style={styles.tabButton}>
          Sign Up
        </Button>
        <Button
          onPress={() => setActiveSection("profile")}
          variant={activeSection === "profile" ? "solid" : "light"}
          color='primary'
          style={styles.tabButton}>
          Profile
        </Button>
      </View>

      {/* Active section content */}
      {activeSection === "status" && renderAuthStatus()}
      {activeSection === "signUp" && renderSignUpForm()}
      {activeSection === "signIn" && renderSignInForm()}
      {activeSection === "forgotPassword" && renderForgotPasswordForm()}
      {activeSection === "profile" && renderProfileSection()}

      {/* Error handling */}
      {auth.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorText}>{auth.error.message}</Text>
          <Button
            onPress={handleClearError}
            variant='ghost'
            color='danger'
            style={styles.button}>
            Clear Error
          </Button>
        </View>
      )}

      {/* Loading indicator */}
      {auth.isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    marginVertical: 6,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
  },
  profileInfo: {
    marginBottom: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#888",
    fontWeight: "bold",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  errorContainer: {
    backgroundColor: "#FFF1F0",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#FFCCC7",
  },
  errorTitle: {
    color: "#CF1322",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorText: {
    color: "#CF1322",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
