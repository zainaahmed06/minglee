import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface BasicItemProps {
  icon: string;
  label: string;
  value: string;
  onPress: () => void;
}

const BasicItem: React.FC<BasicItemProps> = ({icon, label, value, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <Ionicons name={icon as any} size={20} color={colors.text} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.selectText}>Select</Text>
        <Ionicons
          name='chevron-forward'
          size={16}
          color={colors.textTertiary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: fontSizes.md,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: fontSizes.md,
    color: colors.text,
    marginRight: spacing.sm,
  },
  selectText: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
    marginRight: spacing.xs,
  },
});

export default BasicItem;
