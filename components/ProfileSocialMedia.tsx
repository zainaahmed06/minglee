import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface SocialMediaAccount {
  id: string;
  platform: string;
  icon: string;
  username?: string;
}

interface ProfileSocialMediaProps {
  accounts: SocialMediaAccount[];
}

const SocialMediaIcon: React.FC<{account: SocialMediaAccount}> = ({
  account,
}) => {
  // Map platform names to Ionicons names
  const getIconName = (platform: string) => {
    switch (platform.toLowerCase()) {
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
    <TouchableOpacity style={styles.socialIcon}>
      <Ionicons
        name={getIconName(account.platform)}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

const ProfileSocialMedia: React.FC<ProfileSocialMediaProps> = ({accounts}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Social Media</Text>
      <View style={styles.socialIconsContainer}>
        {accounts.map((account) => (
          <SocialMediaIcon key={account.id} account={account} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontFamily: "UrbanistBold",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  socialIconsContainer: {
    flexDirection: "row",
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
});

export default ProfileSocialMedia;
