import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Types for privacy items
interface PrivacyNavigationItem {
  id: string;
  title: string;
  subtitle?: string;
  rightText?: string;
  onPress: () => void;
}

interface PrivacyToggleItem {
  id: string;
  title: string;
  subtitle: string;
  enabled: boolean;
}

// Header component
const PrivacyHeader: React.FC = () => (
  <View style={styles.header}>
    <Pressable
      style={styles.backButton}
      onPress={() => router.back()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Ionicons name='arrow-back' size={24} color={colors.text} />
    </Pressable>
    <Text style={styles.headerTitle}>Profile & Privacy</Text>
    <View style={styles.placeholder} />
  </View>
);

// Section header component
const SectionHeader: React.FC<{title: string}> = ({title}) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

// Navigation item component
const PrivacyNavigationComponent: React.FC<{item: PrivacyNavigationItem}> = ({
  item,
}) => (
  <Pressable style={styles.privacyItem} onPress={item.onPress}>
    <View style={styles.privacyContent}>
      <Text style={styles.privacyTitle}>{item.title}</Text>
      {item.subtitle && (
        <Text style={styles.privacySubtitle}>{item.subtitle}</Text>
      )}
    </View>
    <View style={styles.rightContent}>
      {item.rightText && <Text style={styles.rightText}>{item.rightText}</Text>}
      <Ionicons name='chevron-forward' size={16} color={colors.textTertiary} />
    </View>
  </Pressable>
);

// Toggle item component
const PrivacyToggleComponent: React.FC<{
  item: PrivacyToggleItem;
  onToggle: (id: string) => void;
}> = ({item, onToggle}) => (
  <View style={styles.privacyItem}>
    <View style={styles.privacyContent}>
      <Text style={styles.privacyTitle}>{item.title}</Text>
      <Text style={styles.privacySubtitle}>{item.subtitle}</Text>
    </View>
    <Switch
      value={item.enabled}
      onValueChange={() => onToggle(item.id)}
      trackColor={{false: colors.border, true: colors.primary}}
      thumbColor={item.enabled ? colors.background : colors.textTertiary}
    />
  </View>
);

const ProfilePrivacy: React.FC = () => {
  // State for privacy toggles
  const [privacyToggles, setPrivacyToggles] = useState<PrivacyToggleItem[]>([
    {
      id: "privacy-mode",
      title: "Privacy Mode",
      subtitle: "Enable or disable private mode for incognito browsing.",
      enabled: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setPrivacyToggles((prev) =>
      prev.map((item) =>
        item.id === id ? {...item, enabled: !item.enabled} : item
      )
    );
  };

  // Public Profile section items
  const publicProfileItems: PrivacyNavigationItem[] = [
    {
      id: "username",
      title: "Username",
      rightText: "andrew49",
      onPress: () => {
        router.push("/(single)/changeUsername");
      },
    },
    {
      id: "view-web-profile",
      title: "View Web Profile",
      onPress: () => {
        console.log("Navigate to Web Profile");
        // router.push('/profile/web-profile');
      },
    },
    {
      id: "share-profile",
      title: "Share My Profile",
      onPress: () => {
        console.log("Navigate to Share Profile");
        // router.push('/profile/share');
      },
    },
  ];

  // Privacy & Visibility section items
  const privacyVisibilityItems: PrivacyNavigationItem[] = [
    {
      id: "visibility",
      title: "Visibility",
      subtitle: "Choose who can see your profile.",
      onPress: () => {
        router.push("/visibility");
      },
    },
    {
      id: "profile-verification",
      title: "Profile Verification",
      subtitle: "Verify your profile to gain more trust.",
      onPress: () => {
        console.log("Navigate to Profile Verification");
        // router.push('/privacy/verification');
      },
    },
    {
      id: "blocked-users",
      title: "Blocked Users (24)",
      subtitle: "The people you blocked are displayed here.",
      onPress: () => {
        router.push("/(single)/blockedUsers");
      },
    },
  ];

  // Messages & Active Status section items
  const messagesStatusItems: PrivacyNavigationItem[] = [
    {
      id: "active-status",
      title: "Manage Active Status",
      onPress: () => {
        console.log("Navigate to Active Status settings");
        // router.push('/messages/active-status');
      },
    },
    {
      id: "manage-messages",
      title: "Manage Messages",
      onPress: () => {
        console.log("Navigate to Message settings");
        // router.push('/messages/manage');
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PrivacyHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Your Public Profile Section */}
        <View style={styles.section}>
          <SectionHeader title='Your Public Profile' />
          <View style={styles.sectionContainer}>
            {publicProfileItems.map((item) => (
              <PrivacyNavigationComponent key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Privacy & Visibility Section */}
        <View style={styles.section}>
          <SectionHeader title='Privacy & Visibility' />
          <View style={styles.sectionContainer}>
            {privacyVisibilityItems.map((item) => (
              <PrivacyNavigationComponent key={item.id} item={item} />
            ))}

            {/* Privacy Mode Toggle */}
            {privacyToggles.map((item) => (
              <PrivacyToggleComponent
                key={item.id}
                item={item}
                onToggle={handleToggle}
              />
            ))}
          </View>
        </View>

        {/* Messages & Active Status Section */}
        <View style={styles.section}>
          <SectionHeader title='Messages & Active Status' />
          <View style={styles.sectionContainer}>
            {messagesStatusItems.map((item) => (
              <PrivacyNavigationComponent key={item.id} item={item} />
            ))}
          </View>
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
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
    color: colors.textTertiary,
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginHorizontal: spacing.lg,
  },
  privacyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
  },
  privacyContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  privacyTitle: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  privacySubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default ProfilePrivacy;
