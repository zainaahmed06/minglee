import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {colors, fontSizes, spacing} from "../theme";
import {SelectionTag} from "./SelectionTag";

interface BasicInfoOption {
  id: string;
  label: string;
  selected?: boolean;
}

interface BasicInfoCategoryProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  options: BasicInfoOption[];
  onOptionSelect: (categoryId: string, optionId: string) => void;
  categoryId: string;
}

export const BasicInfoCategory: React.FC<BasicInfoCategoryProps> = ({
  title,
  icon,
  options,
  onOptionSelect,
  categoryId,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons
          name={icon}
          size={20}
          color={colors.textSecondary}
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <SelectionTag
            key={option.id}
            label={option.label}
            selected={option.selected}
            onPress={() => onOptionSelect(categoryId, option.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  icon: {
    marginRight: spacing.xs,
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.text,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
