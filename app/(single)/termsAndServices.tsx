import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

const TermsAndServices = () => {
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Ionicons name='arrow-back' size={24} color={colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>Account & Security</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontFamily: "UrbanistBold",
    color: colors.text,
  },
  placeholder: {
    width: 32,
  },
});

export default TermsAndServices;
