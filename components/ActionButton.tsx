import {colors, fontSizes, spacing} from "@/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "text";
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledButton,
          style,
        ];
      case "secondary":
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledButton,
          style,
        ];
      case "outline":
        return [
          styles.button,
          styles.outlineButton,
          disabled && styles.disabledOutlineButton,
          style,
        ];
      case "text":
        return [
          styles.textButton,
          disabled && styles.disabledTextButton,
          style,
        ];
      default:
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledButton,
          style,
        ];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButtonText;
      case "secondary":
        return styles.secondaryButtonText;
      case "outline":
        return styles.outlineButtonText;
      case "text":
        return [
          styles.textButtonText,
          disabled && styles.disabledTextButtonText,
        ];
      default:
        return styles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator
          size='small'
          color={variant === "outline" ? colors.primary : "white"}
        />
      ) : (
        <Text style={getTextStyle()}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: colors.border,
  },
  disabledOutlineButton: {
    borderColor: colors.border,
  },
  disabledTextButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: "white",
    fontFamily: "UrbanistBold",
    fontSize: fontSizes.md,
  },
  secondaryButtonText: {
    color: "white",
    fontFamily: "UrbanistBold",
    fontSize: fontSizes.md,
  },
  outlineButtonText: {
    color: colors.primary,
    fontFamily: "UrbanistBold",
    fontSize: fontSizes.md,
  },
  textButtonText: {
    color: colors.primary,
    fontFamily: "UrbanistBold",
    fontSize: fontSizes.md,
  },
  disabledTextButtonText: {
    color: colors.textTertiary,
  },
});

export default ActionButton;
