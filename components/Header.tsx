import {colors, fontSizes, spacing} from "@/theme";

import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

interface HeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  backgroundColor?: string;
  titleColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Profile",
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showLeftIcon = true,
  showRightIcon = true,
  backgroundColor,
  titleColor,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.md,
      backgroundColor: backgroundColor || colors.background,
      height: 60,
    },
    leftSection: {
      width: 36,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    rightSection: {
      width: 36,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    iconContainer: {
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    titleContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.md,
    },
    title: {
      fontSize: fontSizes.lg,

      color: titleColor || colors.text,
      textAlign: "center",
      fontFamily: "Cabin",
    },
  });

  const defaultLeftIcon = (
    <Ionicons name='arrow-back' size={24} color={colors.text} />
  );

  const defaultRightIcon = (
    <Ionicons name='settings-outline' size={24} color={colors.text} />
  );

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {showLeftIcon && (
          <Pressable style={styles.iconContainer} onPress={() => router.back()}>
            {leftIcon || defaultLeftIcon}
          </Pressable>
        )}
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {showRightIcon && (
          <Pressable style={styles.iconContainer} onPress={onRightPress}>
            {rightIcon || defaultRightIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Header;
