import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface ProfileHeaderProps {
  profileImage: string;
  completionPercentage: number;
  onEditPress: () => void;
  onSettingsPress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileImage,
  completionPercentage,
  onEditPress,
  onSettingsPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={onSettingsPress}>
            <Ionicons name='settings-outline' size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {completionPercentage === 100 ? (
        <View style={styles.completionBanner}>
          <View style={styles.completionIndicator}>
            <Text style={styles.completionPercentage}>100%</Text>
          </View>
          <View style={styles.completionTextContainer}>
            <Text style={styles.completionText}>Your profile is complete!</Text>
            <TouchableOpacity>
              <Ionicons name='close' size={20} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.completionBanner}>
          <View style={styles.completionIndicator}>
            <Text style={styles.completionPercentage}>
              {completionPercentage}%
            </Text>
          </View>
          <Text style={styles.completionText}>
            Complete your profile to increase your chances of getting matched!
          </Text>
        </View>
      )}

      <Image source={{uri: profileImage}} style={styles.profileImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  editButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: fontSizes.sm,
  },
  settingsButton: {
    padding: spacing.xs,
  },
  completionBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: "100%",
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  completionIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  completionPercentage: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: fontSizes.sm,
  },
  completionTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completionText: {
    color: "white",
    flex: 1,
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  profileImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
  },
});

export default ProfileHeader;
