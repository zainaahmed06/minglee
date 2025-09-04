import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Types for security items
interface SecurityToggleItemType {
  id: string;
  title: string;
  enabled: boolean;
}

interface SecurityNavigationItemType {
  id: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  textColor?: string;
}

// Header component
const SecurityHeader: React.FC = () => (
  <View style={styles.header}>
    <Pressable
      style={styles.backButton}
      onPress={() => router.back()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Ionicons name='arrow-back' size={24} color={colors.text} />
    </Pressable>
    <Text style={styles.headerTitle}>Account & Security</Text>
    <View style={styles.placeholder} />
  </View>
);

// Toggle item component
const SecurityToggleComponent: React.FC<{
  item: SecurityToggleItemType;
  onToggle: (id: string) => void;
}> = ({item, onToggle}) => (
  <View style={styles.securityItem}>
    <Text style={styles.securityTitle}>{item.title}</Text>
    <Switch
      value={item.enabled}
      onValueChange={() => onToggle(item.id)}
      trackColor={{false: colors.border, true: colors.primary}}
      thumbColor={item.enabled ? colors.background : colors.textTertiary}
    />
  </View>
);

// Navigation item component
const SecurityNavigationComponent: React.FC<{
  item: SecurityNavigationItemType;
}> = ({item}) => (
  <Pressable
    style={styles.securityItem}
    onPress={item.onPress}
    android_ripple={{color: colors.backgroundSecondary}}>
    <View style={styles.navigationContent}>
      <Text
        style={[
          styles.securityTitle,
          item.textColor && {color: item.textColor},
        ]}>
        {item.title}
      </Text>
      {item.subtitle && (
        <Text style={styles.securitySubtitle}>{item.subtitle}</Text>
      )}
    </View>
    <Ionicons name='chevron-forward' size={16} color={colors.textTertiary} />
  </Pressable>
);

const AccountSecurity: React.FC = () => {
  // State for security toggles
  const [securityToggles, setSecurityToggles] = useState<
    SecurityToggleItemType[]
  >([
    {id: "remember-me", title: "Remember me", enabled: true},
    {id: "biometric-id", title: "Biometric ID", enabled: false},
    {id: "face-id", title: "Face ID", enabled: false},
    {id: "sms-authenticator", title: "SMS Authenticator", enabled: false},
    {id: "google-authenticator", title: "Google Authenticator", enabled: false},
  ]);

  const handleToggle = (id: string) => {
    setSecurityToggles((prev) =>
      prev.map((item) =>
        item.id === id ? {...item, enabled: !item.enabled} : item
      )
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Implement account deletion logic
            console.log("Account deletion confirmed");
          },
        },
      ]
    );
  };

  const handleDeactivateAccount = () => {
    Alert.alert(
      "Deactivate Account",
      "Are you sure you want to temporarily hide your profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Deactivate",
          style: "destructive",
          onPress: () => {
            // Implement account deactivation logic
            console.log("Account deactivation confirmed");
          },
        },
      ]
    );
  };

  const navigationItems: SecurityNavigationItemType[] = [
    {
      id: "change-password",
      title: "Change Password",
      onPress: () => {
        console.log("Navigate to Change Password");
        // router.push('/security/change-password');
      },
    },
    {
      id: "device-management",
      title: "Device Management",
      subtitle: "Manage your account on the various devices you own.",
      onPress: () => {
        console.log("Navigate to Device Management");
        // router.push('/security/device-management');
      },
    },
    {
      id: "deactivate-account",
      title: "Deactivate Account",
      subtitle:
        "Temporarily hide your profile. Easily reactivate when you're ready.",
      onPress: handleDeactivateAccount,
    },
    {
      id: "delete-account",
      title: "Delete Account",
      subtitle:
        "Permanently remove your profile and data from Datify. Proceed with caution.",
      textColor: colors.danger,
      onPress: handleDeleteAccount,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.background} />

      <SecurityHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Security Toggles */}
        <View style={styles.securityContainer}>
          {securityToggles.map((item) => (
            <SecurityToggleComponent
              key={item.id}
              item={item}
              onToggle={handleToggle}
            />
          ))}
        </View>

        {/* Navigation Items */}
        <View style={styles.securityContainer}>
          {navigationItems.map((item) => (
            <SecurityNavigationComponent key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  securityContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  securityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  securityTitle: {
    fontSize: fontSizes.md,
    fontWeight: "500",
    color: colors.text,
  },
  navigationContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  securitySubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default AccountSecurity;
