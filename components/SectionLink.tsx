import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface SectionLinkProps {
  title: string;
  subtitle?: string;
  icon?: string;
  previewItems?: string[];
  onPress: () => void;
}

const SectionLink: React.FC<SectionLinkProps> = ({
  title,
  subtitle,
  icon,
  previewItems,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        {subtitle ? (
          <Text style={styles.subtitle}>{subtitle}</Text>
        ) : previewItems && previewItems.length > 0 ? (
          <View style={styles.previewContainer}>
            {previewItems.map((item, index) => (
              <View key={index} style={styles.previewItem}>
                <Text style={styles.previewText}>{item}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <Ionicons name='chevron-forward' size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.md,
    fontFamily: "UrbanistMedium",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  previewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.xs,
  },
  previewItem: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  previewText: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
});

export default SectionLink;
