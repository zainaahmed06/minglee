import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {colors, fontSizes, spacing} from "../theme";
import type {Profiles} from "../types/appwrite";

const {width, height} = Dimensions.get("window");
const CARD_WIDTH = width;
const CARD_HEIGHT = height * 0.85; // Increased to cover more of the screen

interface ProfileCardProps {
  profile: Profiles;
  onLike?: () => void;
  onDislike?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onDislike,
}) => {
  // Calculate age from birth_date
  const calculateAge = (birthDate: string | null): number => {
    if (!birthDate) return 0;

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(profile.birth_date);

  return (
    <View style={styles.card}>
      <ImageBackground
        source={{uri: profile.profile_image_url}}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <View style={styles.cardContent}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>
              {profile.first_name}
              {age > 0 ? `, ${age}` : ""}
            </Text>
            {profile.job_title && (
              <View style={styles.jobContainer}>
                <Ionicons
                  name='briefcase-outline'
                  size={16}
                  color={colors.textInverse}
                />
                <Text style={styles.jobTitle}>{profile.job_title}</Text>
                {profile.company && (
                  <Text style={styles.company}> at {profile.company}</Text>
                )}
              </View>
            )}
            {profile.school && (
              <View style={styles.schoolContainer}>
                <Ionicons
                  name='school-outline'
                  size={16}
                  color={colors.textInverse}
                />
                <Text style={styles.school}>{profile.school}</Text>
              </View>
            )}
            {profile.bio && (
              <Text style={styles.bio} numberOfLines={3}>
                {profile.bio}
              </Text>
            )}
          </View>

          {profile.is_verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons
                name='checkmark-circle'
                size={20}
                color={colors.primary}
              />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.dislikeButton]}
              onPress={onDislike}>
              <Ionicons name='close' size={30} color={colors.textInverse} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.likeButton]}
              onPress={onLike}>
              <Ionicons name='heart' size={30} color={colors.textInverse} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: spacing.md, // Removed border radius for full-screen effect
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  image: {
    width: "100%",
    height: "100%",

    borderRadius: spacing.md, // Removed border radius for full-screen effect
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 0, // Removed border radius for full-screen effect
  },
  cardContent: {
    padding: spacing.md,
    borderRadius: spacing.md,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  userInfo: {
    marginBottom: spacing.sm,
  },
  name: {
    fontSize: fontSizes.xl,
    fontWeight: "700",
    color: colors.textInverse,
    marginBottom: spacing.xs,
  },
  jobContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  jobTitle: {
    fontSize: fontSizes.sm,
    color: colors.textInverse,
    marginLeft: spacing.xs,
  },
  company: {
    fontSize: fontSizes.sm,
    color: colors.textInverse,
  },
  schoolContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  school: {
    fontSize: fontSizes.sm,
    color: colors.textInverse,
    marginLeft: spacing.xs,
  },
  bio: {
    fontSize: fontSizes.sm,
    color: colors.textInverse,
    marginTop: spacing.xs,
  },
  verifiedBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedText: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  likeButton: {
    backgroundColor: colors.success,
  },
  dislikeButton: {
    backgroundColor: colors.danger,
  },
});
