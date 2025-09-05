import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {colors, fontSizes, spacing} from "../theme";

interface SelectionTagProps {
  label: string;
  flag?: string;
  selected?: boolean;
  onPress: () => void;
}

export const SelectionTag: React.FC<SelectionTagProps> = ({
  label,
  flag,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.tagContainer, selected && styles.selectedTagContainer]}
      onPress={onPress}>
      <Text style={[styles.tagLabel, selected && styles.selectedTagLabel]}>
        {label} {flag && flag}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 50,
    margin: spacing.sm,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.surfaceSecondary,
    backgroundColor: colors.background,
  },
  selectedTagContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagLabel: {
    fontSize: fontSizes.sm,
    color: colors.surfaceSecondary,
  },
  selectedTagLabel: {
    color: colors.background,
  },
});
