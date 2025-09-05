import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

interface ProfileInfoProps {
  name: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  occupation: string;
  education: string;
  location: string;
  distance: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  age,
  gender,
  height,
  weight,
  occupation,
  education,
  location,
  distance,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameAge}>
        {name} ({age})
      </Text>

      <View style={styles.detailRow}>
        <Ionicons
          name='male-female-outline'
          size={18}
          color={colors.textSecondary}
        />
        <Text style={styles.detailText}>{gender}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons
          name='resize-outline'
          size={18}
          color={colors.textSecondary}
        />
        <Text style={styles.detailText}>
          {height}, {weight}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons
          name='briefcase-outline'
          size={18}
          color={colors.textSecondary}
        />
        <Text style={styles.detailText}>{occupation}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons
          name='school-outline'
          size={18}
          color={colors.textSecondary}
        />
        <Text style={styles.detailText}>{education}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons
          name='location-outline'
          size={18}
          color={colors.textSecondary}
        />
        <Text style={styles.detailText}>Live in {location}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons
          name='navigate-circle-outline'
          size={18}
          color={colors.textSecondary}
        />
        <Text style={styles.detailText}>{distance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  nameAge: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  detailText: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
});

export default ProfileInfo;
