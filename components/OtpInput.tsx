import {colors, radius, spacing} from "@/theme";
import React, {useEffect, useRef, useState} from "react";
import {
  Keyboard,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface OtpInputProps {
  codeLength?: number;
  value: string;
  onValueChange: (value: string) => void;
  autoFocus?: boolean;
  keyboardType?: KeyboardTypeOptions;
  testID?: string;
  onInputComplete?: (value: string) => void;
  cellStyle?: ViewStyle;
  activeCellStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTextStyle?: TextStyle;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  editable?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  codeLength = 4,
  value = "",
  onValueChange,
  autoFocus = true,
  keyboardType = "number-pad",
  testID = "otp-input",
  onInputComplete,
  cellStyle,
  activeCellStyle,
  textStyle,
  activeTextStyle,
  secureTextEntry = false,
  containerStyle,
  editable = true,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRef = useRef<TextInput>(null);

  // Convert the input value to an array for rendering
  const codeArray = value.split("");

  // Auto focus the input on mount if requested
  useEffect(() => {
    if (autoFocus && editable) {
      inputRef.current?.focus();
    }
  }, [autoFocus, editable]);

  // Update focusedIndex whenever value changes
  useEffect(() => {
    if (inputRef.current?.isFocused()) {
      // When text is entered or deleted, move focus to the current position
      setFocusedIndex(value.length);
    }
  }, [value]);

  // Handle input changes
  const handleChange = (text: string) => {
    // Filter out non-digits if it's a number-pad
    const formattedText =
      keyboardType === "number-pad" ? text.replace(/[^0-9]/g, "") : text;

    // Limit to codeLength
    const newValue = formattedText.slice(0, codeLength);

    // Update value
    onValueChange(newValue);

    // Check if input is complete
    if (newValue.length === codeLength && onInputComplete) {
      onInputComplete(newValue);
      Keyboard.dismiss();
    }
  };

  // Handle focus on the hidden input
  const handleFocus = () => {
    // When input is focused, set focused index to the current input position
    setFocusedIndex(value.length);
  };

  // Handle blur on the hidden input
  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  // Cell press handler to focus the hidden input
  const handleCellPress = () => {
    if (editable) {
      inputRef.current?.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      <View style={styles.cellsContainer}>
        {[...Array(codeLength)].map((_, index) => {
          // Only highlight the current input position when focused
          const isCurrentPosition = index === focusedIndex;
          const isFilled = index < value.length;

          return (
            <View
              key={index}
              style={[
                styles.cell,
                cellStyle,
                isCurrentPosition && styles.activeCell,
                isCurrentPosition && activeCellStyle,
              ]}
              onTouchStart={handleCellPress}>
              {isFilled && (
                <TextInput
                  style={[
                    styles.cellText,
                    textStyle,
                    isCurrentPosition && styles.activeCellText,
                    isCurrentPosition && activeTextStyle,
                  ]}
                  value={secureTextEntry ? "•" : codeArray[index]}
                  editable={false}
                />
              )}
            </View>
          );
        })}
      </View>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        maxLength={codeLength}
        caretHidden
        style={styles.hiddenInput}
        testID={`${testID}-hidden-input`}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  cellsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    margin: spacing.xs,
  },
  activeCell: {
    backgroundColor: "rgba(150, 16, 255, 0.1)",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  activeCellText: {
    color: colors.primary,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});

export default OtpInput;
