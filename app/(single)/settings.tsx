import Button from "@/components/Button";
import {useAuth} from "@/store/useAuth";
import {colors, fontSizes, radius, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Types for settings items
interface SettingsItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  showChevron?: boolean;
  textColor?: string;
}

// Header component
const SettingsHeader: React.FC = () => (
  <View style={styles.header}>
    <Pressable
      style={styles.backButton}
      onPress={() => router.back()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Ionicons name='arrow-back' size={24} color={colors.text} />
    </Pressable>
    <Text style={styles.headerTitle}>Settings</Text>
    <View style={styles.placeholder} />
  </View>
);

// Upgrade membership banner component
const UpgradeBanner: React.FC = () => (
  <Pressable
    style={styles.upgradeBanner}
    onPress={() => router.push("/(single)/subscriptions")}
    android_ripple={{color: "rgba(255,255,255,0.1)"}}>
    <View style={styles.upgradeContent}>
      <View style={styles.upgradeIconContainer}>
        <View style={styles.upgradeIcon}>
          <Ionicons name='star' size={24} color='#FF6B35' />
        </View>
        <View style={styles.upgradeStars}>
          <View style={[styles.upgradeStar, {top: 8, left: 8}]} />
          <View style={[styles.upgradeStar, {top: 4, right: 12}]} />
          <View style={[styles.upgradeStar, {bottom: 12, left: 4}]} />
        </View>
      </View>
      <View style={styles.upgradeTextContainer}>
        <Text style={styles.upgradeTitle}>Upgrade Membership Now!</Text>
        <Text style={styles.upgradeSubtitle}>
          Enjoy all the benefits and explore more possibilities
        </Text>
      </View>
    </View>
    <Ionicons name='chevron-forward' size={24} color='white' />
  </Pressable>
);

// Settings item component
const SettingsItemComponent: React.FC<{item: SettingsItem}> = ({item}) => (
  <Pressable
    style={styles.settingsItem}
    onPress={item.onPress}
    android_ripple={{color: colors.backgroundSecondary}}>
    <View style={styles.settingsItemLeft}>
      <View style={styles.settingsIconContainer}>
        <Ionicons name={item.icon} size={24} color={colors.textSecondary} />
      </View>
      <Text
        style={[
          styles.settingsItemText,
          item.textColor && {color: item.textColor},
        ]}>
        {item.title}
      </Text>
    </View>
    {item.showChevron !== false && (
      <Ionicons name='chevron-forward' size={24} color={colors.textTertiary} />
    )}
  </Pressable>
);

const Settings: React.FC = () => {
  const {signOut, user} = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            router.replace("/(auth)/signin");
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  const settingsItems: SettingsItem[] = [
    {
      id: "discovery",
      title: "Discovery Preferences",
      icon: "compass-outline",
      onPress: () => {
        router.push("/(single)/discovery");
      },
    },
    {
      id: "profile",
      title: "Profile & Privacy",
      icon: "person-outline",
      onPress: () => {
        console.log("Navigate to Profile & Privacy");
        // router.push('/settings/profile');
      },
    },
    {
      id: "notifications",
      title: "Notification",
      icon: "notifications-outline",
      onPress: () => {
        console.log("Navigate to Notifications");
        // router.push('/settings/notifications');
      },
    },
    {
      id: "security",
      title: "Account & Security",
      icon: "shield-checkmark-outline",
      onPress: () => {
        console.log("Navigate to Account & Security");
        // router.push('/settings/security');
      },
    },
    {
      id: "subscription",
      title: "Subscription",
      icon: "star-outline",
      onPress: () => {
        router.push("/(single)/subscriptions");
      },
    },
    {
      id: "appearance",
      title: "App Appearance",
      icon: "eye-outline",
      onPress: () => {
        console.log("Navigate to App Appearance");
        // router.push('/settings/appearance');
      },
    },
    {
      id: "integrations",
      title: "Third Party Integrations",
      icon: "git-network-outline",
      onPress: () => {
        console.log("Navigate to Third Party Integrations");
        // router.push('/settings/integrations');
      },
    },
    {
      id: "analytics",
      title: "Data & Analytics",
      icon: "analytics-outline",
      onPress: () => {
        console.log("Navigate to Data & Analytics");
        // router.push('/settings/analytics');
      },
    },
    {
      id: "support",
      title: "Help & Support",
      icon: "help-circle-outline",
      onPress: () => {
        console.log("Navigate to Help & Support");
        // router.push('/settings/support');
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.background} />

      <SettingsHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <UpgradeBanner />

        <View style={styles.settingsContainer}>
          {settingsItems.map((item) => (
            <SettingsItemComponent key={item.id} item={item} />
          ))}
          <Button
            style={{marginTop: spacing.lg}}
            variant='solid'
            color='danger'>
            Log Out
          </Button>
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
    paddingHorizontal: spacing.md,
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
  upgradeBanner: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  upgradeContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  upgradeIconContainer: {
    position: "relative",
    marginRight: spacing.md,
  },
  upgradeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeStars: {
    position: "absolute",
    width: 40,
    height: 40,
  },
  upgradeStar: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: "white",
    marginBottom: spacing.xs,
  },
  upgradeSubtitle: {
    fontSize: fontSizes.sm,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 18,
  },
  settingsContainer: {
    marginHorizontal: spacing.md,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingsIconContainer: {
    width: 24,
    alignItems: "center",
    marginRight: spacing.md,
  },
  settingsItemText: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: "500",
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default Settings;
