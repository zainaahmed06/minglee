import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

type ThemeType = "Light" | "Dark" | "System";
type LanguageType = "English (US)" | "Spanish" | "French" | "German";

const AppAppearence = () => {
  const [selectedTheme] = useState<ThemeType>("Light");
  const [selectedLanguage] = useState<LanguageType>("English (US)");

  const handleThemePress = () => {
    // Navigate to theme selection screen or show options
    // This would be implemented in a real app
    console.log("Theme pressed");
  };

  const handleLanguagePress = () => {
    // Navigate to language selection screen or show options
    // This would be implemented in a real app
    console.log("Language pressed");
  };

  const SubscriptionHeader: React.FC = () => (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Ionicons name='arrow-back' size={24} color={colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>App Appearence</Text>
      <View style={styles.placeholder} />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <SubscriptionHeader />
      <View style={{height: spacing.lg}} />
      {/* Theme Option */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handleThemePress}
        activeOpacity={0.7}>
        <Text style={styles.settingTitle}>Theme</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.settingValue}>{selectedTheme}</Text>
          <Ionicons
            name='chevron-forward'
            size={20}
            color={colors.textTertiary}
            style={styles.chevron}
          />
        </View>
      </TouchableOpacity>

      {/* App Language Option */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handleLanguagePress}
        activeOpacity={0.7}>
        <Text style={styles.settingTitle}>App Language</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.settingValue}>{selectedLanguage}</Text>
          <Ionicons
            name='chevron-forward'
            size={20}
            color={colors.textTertiary}
            style={styles.chevron}
          />
        </View>
      </TouchableOpacity>
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  settingTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "500",
    color: colors.text,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  chevron: {
    marginLeft: spacing.xs,
  },
});

export default AppAppearence;
