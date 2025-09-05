import {colors, fontSizes, spacing} from "@/theme";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

interface ProfileBioProps {
  aboutText: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({aboutText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>About Me</Text>
      <Text style={styles.bioText}>{aboutText}</Text>
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
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bioText: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});

export default ProfileBio;
