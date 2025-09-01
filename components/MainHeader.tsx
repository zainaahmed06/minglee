import {BellIcon, LogoIcon, MenuIcon} from "@/constants/OtherIcons";
import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";

const MainHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <LogoIcon />
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <BellIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MenuIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
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
