import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface EditHeaderProps {
  title: string;
  onCancel: () => void;
  onSave: () => void;
}

const EditHeader: React.FC<EditHeaderProps> = ({title, onCancel, onSave}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onCancel}>
        <Ionicons name='arrow-back' size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  backButton: {
    padding: spacing.xs,
  },
  rightContainer: {
    minWidth: 60, // Ensures consistent spacing for the title
  },
  saveButton: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.primary,
  },
});

export default EditHeader;
