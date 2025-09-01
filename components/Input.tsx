import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import {colors, fontSizes, radius, spacing} from "@/theme/";

export type InputVariant = "flat";
export type InputColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type InputSize = "sm" | "md" | "lg";
export type InputRadius = "none" | "sm" | "md" | "lg" | "full";
export type InputType =
  | "text"
  | "email"
  | "url"
  | "password"
  | "tel"
  | "search"
  | "file";
export type ValidationBehavior = "native" | "aria";

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export interface InputProps
  extends Omit<TextInputProps, "onChange" | "onChangeText" | "style"> {
  children?: React.ReactNode;
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  radius?: InputRadius;
  label?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode | ((v: ValidationResult) => React.ReactNode);
  validate?: (value: string) => ValidationResult | boolean | null | undefined;
  validationBehavior?: ValidationBehavior;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  type?: InputType;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  fullWidth?: boolean;
  isClearable?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  baseRef?: React.RefObject<View>;
  disableAnimation?: boolean;
  classNames?: {
    base?: string;
    label?: string;
    inputWrapper?: string;
    innerWrapper?: string;
    input?: string;
    clearButton?: string;
    helperWrapper?: string;
    description?: string;
    errorMessage?: string;
  };
  style?: StyleProp<ViewStyle>;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}

export const Input = React.memo(
  forwardRef<TextInput, InputProps>(
    (
      {
        children,
        variant = "flat",
        color = "default",
        size = "md",
        radius: btnRadius = "md",
        label,
        value,
        defaultValue,
        placeholder,
        description,
        errorMessage,
        validate,
        validationBehavior = "native",
        minLength,
        maxLength,
        pattern,
        type = "text",
        startContent,
        endContent,
        fullWidth = true,
        isClearable = false,
        isRequired = false,
        isReadOnly = false,
        isDisabled = false,
        isInvalid = false,
        baseRef,
        disableAnimation = false,
        classNames,
        onChange,
        onValueChange,
        onClear,
        style,
        ...props
      },
      ref
    ) => {
      const [internalValue, setInternalValue] = useState(defaultValue || "");
      const [isFocused, setIsFocused] = useState(false);
      const [validationResult, setValidationResult] =
        useState<ValidationResult>({
          isValid: true,
        });

      const inputValue = value !== undefined ? value : internalValue;
      const isControlled = value !== undefined;

      // Memoized size configurations
      const sizeConfig = useMemo(
        () => ({
          sm: {
            height: spacing.xl,
            paddingHorizontal: spacing.sm,
            fontSize: fontSizes.sm,
            fontFamily: "Cabin",
            labelFontSize: fontSizes.xs,
          },
          md: {
            height: spacing.xxl,
            paddingHorizontal: spacing.sm,
            fontSize: fontSizes.sm,
            fontFamily: "Cabin",
            labelFontSize: fontSizes.sm,
          },
          lg: {
            height: spacing.xxxl,
            paddingHorizontal: spacing.sm,
            fontSize: fontSizes.md,
            fontFamily: "Cabin",
            labelFontSize: fontSizes.sm,
          },
        }),
        // Dependencies are stable, we don't need them in the dependency array
        []
      );

      // Get border radius based on input radius type
      const getBorderRadius = useCallback((type: InputRadius) => {
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

      // Memoized color configurations
      const getColorConfig = useCallback(() => {
        const config = {
          borderColor: colors.border,
          backgroundColor: colors.surfaceSecondary,
          textColor: colors.text,
          labelColor: colors.textSecondary,
          placeholderColor: colors.textTertiary,
        };

        // Priority 1: Disabled state (highest priority)
        if (isDisabled) {
          config.backgroundColor = colors.backgroundSecondary;
          config.textColor = colors.textTertiary;
          config.borderColor = colors.borderSecondary;
          return config; // Early return to prevent other states
        }

        // Priority 2: Invalid/Error state (higher than focus)
        if (isInvalid || validationResult.errorMessage) {
          config.borderColor = colors.danger;
          config.labelColor = colors.danger;
          return config; // Early return to prevent focus styles when there's an error
        }

        // Priority 3: Focus state (only if no errors and not disabled)
        if (isFocused) {
          switch (color) {
            case "primary":
              config.borderColor = colors.primary;
              config.labelColor = colors.primary;
              break;
            case "secondary":
              config.borderColor = colors.secondary;
              config.labelColor = colors.secondary;
              break;
            case "success":
              config.borderColor = colors.success;
              config.labelColor = colors.success;
              break;
            case "warning":
              config.borderColor = colors.warning;
              config.labelColor = colors.warning;
              break;
            case "danger":
              config.borderColor = colors.danger;
              config.labelColor = colors.danger;
              break;
            default:
              config.borderColor = colors.primary;
              config.labelColor = colors.primary;
          }
        }

        // Priority 4: Default state
        return config;
      }, [
        isDisabled,
        isInvalid,
        validationResult.errorMessage,
        isFocused,
        color,
      ]);

      // Add useEffect to handle external state changes
      useEffect(() => {
        // Reset focus state when input becomes invalid externally
        if (isInvalid && isFocused) {
          setIsFocused(false);
        }
      }, [isInvalid, isFocused]);

      useEffect(() => {
        // Reset focus state when input becomes disabled externally
        if (isDisabled && isFocused) {
          setIsFocused(false);
        }
      }, [isDisabled, isFocused]);

      const colorConfig = useMemo(() => getColorConfig(), [getColorConfig]);
      const currentSizeConfig = useMemo(
        () => sizeConfig[size],
        [sizeConfig, size]
      );

      const validateInput = useCallback(
        (inputValue: string) => {
          if (!validate) return {isValid: true};

          const result = validate(inputValue);

          if (typeof result === "boolean") {
            return {isValid: result};
          }

          if (result === null || result === undefined) {
            return {isValid: true};
          }

          return result;
        },
        [validate]
      );

      const handleTextChange = useCallback(
        (text: string) => {
          if (!isControlled) {
            setInternalValue(text);
          }

          // Validate input
          const validation = validateInput(text);
          setValidationResult(validation);

          // If validation fails, remove focus state to show error properly
          if (!validation.isValid && isFocused) {
            setIsFocused(false);
          }

          onValueChange?.(text);
        },
        [isControlled, validateInput, isFocused, onValueChange]
      );

      const handleChange = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
          const text = e.nativeEvent.text;
          handleTextChange(text);
          onChange?.(e);
        },
        [handleTextChange, onChange]
      );

      // Custom focus handler
      const handleFocus = useCallback(
        (e: any) => {
          // Only set focus if not disabled and not invalid
          if (!isDisabled && !isInvalid && !validationResult.errorMessage) {
            setIsFocused(true);
          }
          props.onFocus?.(e);
        },
        [isDisabled, isInvalid, validationResult.errorMessage, props]
      );

      // Custom blur handler
      const handleBlur = useCallback(
        (e: any) => {
          setIsFocused(false);
          // Re-validate on blur
          if (inputValue) {
            const validation = validateInput(inputValue);
            setValidationResult(validation);
          }
          props.onBlur?.(e);
        },
        [inputValue, validateInput, props]
      );

      const handleClear = useCallback(() => {
        const newValue = "";
        if (!isControlled) {
          setInternalValue(newValue);
        }
        setValidationResult({isValid: true});
        onValueChange?.(newValue);
        onClear?.();
      }, [isControlled, onValueChange, onClear]);

      const shouldShowLabel = useMemo(() => label, [label]);

      const getTextInputType = useCallback(():
        | TextInputProps["keyboardType"]
        | undefined => {
        switch (type) {
          case "email":
            return "email-address";
          case "tel":
            return "phone-pad";
          case "url":
            return "url";
          default:
            return "default";
        }
      }, [type]);

      const renderErrorMessage = useCallback(() => {
        const error =
          validationResult.errorMessage || (isInvalid && errorMessage);
        if (!error) return null;

        const errorContent =
          typeof errorMessage === "function"
            ? errorMessage(validationResult)
            : error;

        return (
          <Text
            style={[
              styles.errorText,
              {
                color: colors.danger,
                fontSize: fontSizes.xs,
                fontFamily: "Cabin",
              },
            ]}>
            {errorContent as React.ReactNode}
          </Text>
        );
      }, [isInvalid, errorMessage, validationResult]);

      const renderDescription = useCallback(() => {
        if (!description) return null;

        return (
          <Text
            style={[
              styles.description,
              {
                color: colors.textSecondary,
                fontSize: fontSizes.xs,
                fontFamily: "Cabin",
              },
            ]}>
            {description}
          </Text>
        );
      }, [description]);

      const inputWrapperStyle: StyleProp<ViewStyle> = useMemo(
        () => [
          styles.inputWrapper,
          {
            height: currentSizeConfig.height,
            borderWidth: 1,
            borderColor: colorConfig.borderColor,
            backgroundColor: colorConfig.backgroundColor,
            borderRadius: getBorderRadius(btnRadius),
            paddingHorizontal: currentSizeConfig.paddingHorizontal,
          },
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          style,
        ],
        [
          currentSizeConfig,
          colorConfig,
          getBorderRadius,
          btnRadius,
          fullWidth,
          isDisabled,
          style,
        ]
      );

      const inputStyle: StyleProp<TextStyle> = useMemo(
        () => [
          styles.input,
          {
            fontSize: currentSizeConfig.fontSize,
            color: colorConfig.textColor,
            fontFamily: "Cabin",
          },
        ],
        [currentSizeConfig.fontSize, colorConfig.textColor]
      );

      const labelStyle: StyleProp<TextStyle> = useMemo(
        () => [
          styles.label,
          {
            fontSize: currentSizeConfig.labelFontSize,
            color: colorConfig.labelColor,
            fontFamily: "Cabin",
          },
        ],
        [currentSizeConfig.labelFontSize, colorConfig.labelColor]
      );

      const clearButtonTextStyle = useMemo(
        () => ({
          color: colors.textTertiary,
          fontSize: fontSizes.lg,
        }),
        []
      );

      const requiredAsteriskStyle = useMemo(
        () => ({
          color: colors.danger,
        }),
        []
      );

      return (
        <View
          style={[styles.container, fullWidth && styles.fullWidth]}
          ref={baseRef}>
          {shouldShowLabel && (
            <Text style={labelStyle}>
              {label}{" "}
              {isRequired && <Text style={requiredAsteriskStyle}>*</Text>}
            </Text>
          )}

          <View style={inputWrapperStyle}>
            {startContent && (
              <View style={styles.startContent}>{startContent}</View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                ref={ref}
                style={inputStyle}
                value={inputValue}
                placeholder={placeholder}
                placeholderTextColor={colorConfig.placeholderColor}
                editable={!isReadOnly && !isDisabled}
                secureTextEntry={type === "password"}
                keyboardType={getTextInputType()}
                maxLength={maxLength}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                {...props}
              />
            </View>

            {(endContent || (isClearable && inputValue)) && (
              <View style={styles.endContent}>
                {isClearable && inputValue ? (
                  <Pressable onPress={handleClear} style={styles.clearButton}>
                    <Text style={clearButtonTextStyle}>×</Text>
                  </Pressable>
                ) : (
                  endContent
                )}
              </View>
            )}
          </View>

          {renderErrorMessage()}
          {renderDescription()}
          {children}
        </View>
      );
    }
  )
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  fullWidth: {
    width: "100%",
  },
  label: {
    marginBottom: 4,
    fontWeight: "400",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  inputContainer: {
    flex: 1,
    position: "relative",
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    textAlignVertical: "center",
  },
  startContent: {
    marginRight: 8,
    justifyContent: "center",
  },
  endContent: {
    marginLeft: 8,
    justifyContent: "center",
  },
  clearButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  errorText: {
    marginTop: 4,
    fontWeight: "400",
  },
  description: {
    marginTop: 4,
    fontWeight: "400",
  },
});

Input.displayName = "Input";
