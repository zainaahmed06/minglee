import {colors, fontSizes, radius, spacing} from "@/theme/";
import React, {forwardRef, useCallback, useMemo, useState} from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export type ButtonVariant =
  | "solid"
  | "bordered"
  | "light"
  | "flat"
  | "faded"
  | "ghost";
export type ButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";
export type SpinnerPlacement = "start" | "end";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  spinner?: React.ReactNode;
  spinnerPlacement?: SpinnerPlacement;
  fullWidth?: boolean;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  disableRipple?: boolean;
  disableAnimation?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
  onPressStart?: (e: GestureResponderEvent) => void;
  onPressEnd?: (e: GestureResponderEvent) => void;
  onPressChange?: (isPressed: boolean) => void;
  onPressUp?: (e: GestureResponderEvent) => void;
  onKeyDown?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  onClick?: () => void;
}

const Button = forwardRef<any, ButtonProps>(
  (
    {
      children,
      variant = "solid",
      color = "default",
      size = "md",
      radius: btnRadius = "md",
      startContent,
      endContent,
      spinner,
      spinnerPlacement = "start",
      fullWidth = false,
      isIconOnly = false,
      isDisabled = false,
      isLoading = false,
      disableRipple = false,
      disableAnimation = false,
      style,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      onKeyDown,
      onKeyUp,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    // Get the appropriate border radius value based on the theme
    const getBorderRadius = useCallback((type: ButtonRadius) => {
      switch (type) {
        case "none":
          return 0;
        case "sm":
          return radius.sm;
        case "md":
          return radius.md;
        case "lg":
          return radius.lg;
        case "full":
          return radius.full;
        default:
          return radius.md;
      }
    }, []);

    // Size configurations based on theme spacing and font sizes
    const sizeConfig = useMemo(
      () => ({
        sm: {
          height: spacing.xl,
          paddingHorizontal: spacing.md,
          fontSize: fontSizes.sm,
          iconSize: 16,
        },
        md: {
          height: spacing.xxl,
          paddingHorizontal: spacing.lg,
          fontSize: fontSizes.md,
          iconSize: 18,
        },
        lg: {
          height: spacing.xxxl,
          paddingHorizontal: spacing.xl,
          fontSize: fontSizes.lg,
          iconSize: 20,
        },
      }),
      []
    );

    // Get color configuration based on variant and color props
    const getColorConfig = useCallback(() => {
      const baseColors = {
        default: colors.text,
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
      };

      const baseColor = baseColors[color];
      const config = {
        backgroundColor: "transparent",
        textColor: colors.text,
        borderColor: "transparent",
      };

      switch (variant) {
        case "solid":
          config.backgroundColor = baseColor;
          config.textColor =
            color === "default" ? colors.text : colors.textInverse;
          config.borderColor = baseColor;
          break;

        case "bordered":
          config.backgroundColor = "transparent";
          config.textColor = baseColor;
          config.borderColor = baseColor;
          break;

        case "light":
          config.backgroundColor = colors.backgroundSecondary;
          config.textColor = baseColor;
          config.borderColor = "transparent";
          break;

        case "flat":
          config.backgroundColor = colors.backgroundSecondary;
          config.textColor = baseColor;
          config.borderColor = "transparent";
          break;

        case "faded":
          config.backgroundColor = colors.backgroundTertiary;
          config.textColor = baseColor;
          config.borderColor = colors.border;
          break;

        case "ghost":
          config.backgroundColor = "transparent";
          config.textColor = baseColor;
          config.borderColor = "transparent";
          break;
      }

      // Handle pressed state
      if (isPressed && !isDisabled && !disableAnimation) {
        if (variant === "solid") {
          config.backgroundColor = baseColor; // Maintain color but opacity will be handled by activeOpacity
        } else if (variant === "bordered" || variant === "ghost") {
          config.backgroundColor = colors.backgroundSecondary;
        } else {
          config.backgroundColor = colors.backgroundTertiary;
        }
      }

      // Handle disabled state
      if (isDisabled) {
        config.backgroundColor = colors.backgroundSecondary;
        config.textColor = colors.textTertiary;
        config.borderColor = colors.borderSecondary;
      }

      return config;
    }, [variant, color, isPressed, isDisabled, disableAnimation]);

    const colorConfig = useMemo(() => getColorConfig(), [getColorConfig]);
    const currentSizeConfig = useMemo(
      () => sizeConfig[size],
      [sizeConfig, size]
    );

    const handlePressIn = useCallback(
      (e: GestureResponderEvent) => {
        if (!disableAnimation) {
          setIsPressed(true);
        }
        onPressChange?.(true);
        onPressStart?.(e);
      },
      [disableAnimation, onPressChange, onPressStart]
    );

    const handlePressOut = useCallback(
      (e: GestureResponderEvent) => {
        if (!disableAnimation) {
          setIsPressed(false);
        }
        onPressChange?.(false);
        onPressEnd?.(e);
        onPressUp?.(e);
      },
      [disableAnimation, onPressChange, onPressEnd, onPressUp]
    );

    const handlePress = useCallback(
      (e: GestureResponderEvent) => {
        if (!isDisabled && !isLoading) {
          onPress?.(e);
          onClick?.();
        }
      },
      [isDisabled, isLoading, onPress, onClick]
    );

    const renderSpinner = useCallback(() => {
      if (!isLoading) return null;

      if (spinner) {
        return spinner;
      }

      return <ActivityIndicator size='small' color={colorConfig.textColor} />;
    }, [isLoading, spinner, colorConfig.textColor]);

    const renderContent = useCallback(() => {
      if (isIconOnly) {
        return isLoading ? renderSpinner() : children;
      }

      const showStartSpinner = isLoading && spinnerPlacement === "start";
      const showEndSpinner = isLoading && spinnerPlacement === "end";

      return (
        <>
          {(startContent || showStartSpinner) && (
            <View style={styles.startContent}>
              {showStartSpinner ? renderSpinner() : startContent}
            </View>
          )}

          {children && (
            <Text
              style={[
                styles.text,
                {
                  fontSize: currentSizeConfig.fontSize,
                  color: colorConfig.textColor,
                },
                isLoading && styles.loadingText,
              ]}>
              {children}
            </Text>
          )}

          {(endContent || showEndSpinner) && (
            <View style={styles.endContent}>
              {showEndSpinner ? renderSpinner() : endContent}
            </View>
          )}
        </>
      );
    }, [
      isIconOnly,
      isLoading,
      renderSpinner,
      children,
      spinnerPlacement,
      startContent,
      endContent,
      currentSizeConfig,
      colorConfig.textColor,
    ]);

    // Combine all styles for the button
    const buttonStyle = useMemo(
      () => [
        styles.button,
        {
          height: currentSizeConfig.height,
          width: isIconOnly ? currentSizeConfig.height : undefined,
          paddingHorizontal: isIconOnly
            ? 0
            : currentSizeConfig.paddingHorizontal,
          backgroundColor: colorConfig.backgroundColor,
          borderColor: colorConfig.borderColor,
          borderRadius: getBorderRadius(btnRadius),
          borderWidth: variant === "bordered" || variant === "faded" ? 1 : 0,
        },
        fullWidth && !isIconOnly && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ],
      [
        currentSizeConfig,
        isIconOnly,
        colorConfig,
        getBorderRadius,
        btnRadius,
        variant,
        fullWidth,
        isDisabled,
        style,
      ]
    );

    return (
      <Pressable
        ref={ref}
        style={buttonStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={isDisabled || isLoading}
        {...props}>
        {renderContent()}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    minHeight: 32,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
    flexShrink: 1,
  },
  loadingText: {
    opacity: 0.7,
  },
  startContent: {
    marginRight: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  endContent: {
    marginLeft: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
});

Button.displayName = "Button";

export default Button;
