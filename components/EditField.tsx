import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FieldType = "text" | "date" | "select" | "button";

interface EditFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  editable?: boolean;
  rightIcon?: string;
  type?: FieldType;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const EditField: React.FC<EditFieldProps> = ({
  label,
  value,
  placeholder,
  editable = true,
  rightIcon,
  type = "text",
  onPress,
  onChangeText,
}) => {
  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <TouchableOpacity
            style={styles.selectContainer}
            onPress={onPress}
            disabled={!editable}>
            <Text style={[styles.fieldValue, !value && styles.placeholderText]}>
              {value || placeholder}
            </Text>
            <Ionicons
              name='chevron-forward'
              size={16}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        );

      case "date":
        return (
          <TouchableOpacity
            style={styles.selectContainer}
            onPress={onPress}
            disabled={!editable}>
            <Text style={[styles.fieldValue, !value && styles.placeholderText]}>
              {value || placeholder}
            </Text>
            <Ionicons
              name='calendar-outline'
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        );

      case "button":
        return (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPress}
            disabled={!editable}>
            <Text style={[styles.placeholderText, styles.buttonText]}>
              {placeholder}
            </Text>
            {rightIcon && (
              <Ionicons
                name={rightIcon as any}
                size={16}
                color={colors.textTertiary}
              />
            )}
          </TouchableOpacity>
        );

      default:
        return (
          <View style={styles.textInputContainer}>
            <TextInput
              value={value}
              placeholder={placeholder}
              placeholderTextColor={colors.textTertiary}
              style={styles.textInput}
              editable={editable}
              onChangeText={onChangeText}
            />
            {rightIcon && (
              <Ionicons
                name={rightIcon as any}
                size={16}
                color={colors.textTertiary}
              />
            )}
          </View>
        );
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {renderField()}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fieldLabel: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text,
    paddingVertical: spacing.xs,
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
  fieldValue: {
    fontSize: fontSizes.md,
    color: colors.text,
    flex: 1,
  },
  placeholderText: {
    color: colors.textTertiary,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  buttonText: {
    color: colors.textTertiary,
  },
});

export default EditField;
