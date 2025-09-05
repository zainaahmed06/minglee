import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, TextInput, View} from "react-native";

interface SocialMediaLinkProps {
  platform: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({
  platform,
  value,
  onChangeText,
}) => {
  // Map platform names to Ionicons names
  const getIconName = (platformName: string) => {
    switch (platformName.toLowerCase()) {
      case "facebook":
        return "logo-facebook" as const;
      case "instagram":
        return "logo-instagram" as const;
      case "twitter":
        return "logo-twitter" as const;
      case "linkedin":
        return "logo-linkedin" as const;
      case "tiktok":
        return "logo-tiktok" as const;
      default:
        return "link-outline" as const;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={getIconName(platform)} size={24} color={colors.text} />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={`https://${platform.toLowerCase()}.com/username`}
        placeholderTextColor={colors.textTertiary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.text,
    paddingVertical: spacing.xs,
  },
});

export default SocialMediaLink;
