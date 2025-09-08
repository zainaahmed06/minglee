import {colors, fontSizes, spacing} from "@/theme";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

interface Interest {
  id: string;
  name: string;
  icon: string;
}

interface ProfileInterestsProps {
  interests: Interest[];
}

const InterestTag: React.FC<{interest: Interest}> = ({interest}) => {
  return (
    <View style={styles.interestTag}>
      <Text style={styles.interestIcon}>{interest.icon}</Text>
      <Text style={styles.interestName}>{interest.name}</Text>
    </View>
  );
};

const ProfileInterests: React.FC<ProfileInterestsProps> = ({interests}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.interestsContainer}>
        {interests.map((interest) => (
          <InterestTag key={interest.id} interest={interest} />
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
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  interestIcon: {
    marginRight: 4,
  },
  interestName: {
    fontSize: fontSizes.sm,
    color: colors.text,
  },
});

export default ProfileInterests;
