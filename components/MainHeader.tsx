import {BellIcon, LogoIcon, MenuIcon} from "@/constants/OtherIcons";
import {colors, spacing} from "@/theme";
import {router} from "expo-router";
import React from "react";
import {Pressable, StyleSheet, View} from "react-native";

const MainHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <LogoIcon />
      </View>

      <View style={styles.rightSection}>
        <Pressable
          onPress={() => router.push("/(single)/notifications")}
          style={styles.iconButton}>
          <BellIcon />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <MenuIcon />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    backgroundColor: colors.background,
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "UrbanistBold",
    color: "#1F2937", // Dark gray color
    flex: 1,
    textAlign: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
});

export default MainHeader;
