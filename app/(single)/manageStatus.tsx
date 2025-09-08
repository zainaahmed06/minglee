import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Toggle from "react-native-reanimated-toggle";

const ManageStatus = () => {
  const [showActiveStatus, setShowActiveStatus] = useState<boolean>(true);
  const [showRecentlyActive, setShowRecentlyActive] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Active Status</Text>
      </View>

      {/* Active Status Option */}
      <View style={styles.optionContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.optionTitle}>Show Active Status</Text>
          <Text style={styles.optionDescription}>
            If you are active on Datify, your status will be displayed to other
            people.
          </Text>
        </View>
        <Toggle
          toggled={showActiveStatus}
          onChange={() => setShowActiveStatus(!showActiveStatus)}
          thumbOffset={4}
          activeTrackColor={colors.primary}
          inActiveTrackColor={colors.border}
          trackStyle={{height: 30, width: 48}}
          thumbSize={20}
        />
      </View>

      {/* Recently Active Option */}
      <View style={styles.optionContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.optionTitle}>Show Recently Active Status</Text>
          <Text style={styles.optionDescription}>
            Recently active status will be displayed if you have been active on
            Datify in the last 24 hours.
          </Text>
        </View>
        <Toggle
          toggled={showRecentlyActive}
          onChange={() => setShowRecentlyActive(!showRecentlyActive)}
          thumbOffset={4}
          activeTrackColor='orange'
          trackStyle={{height: 30, width: 48}}
          thumbSize={20}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
  },
  backButton: {
    paddingRight: spacing.md,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontFamily: "UrbanistBold",
    color: colors.text,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textContainer: {
    flex: 1,
    paddingRight: spacing.lg,
  },
  optionTitle: {
    fontSize: fontSizes.lg,
    fontFamily: "UrbanistMedium",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  switch: {
    transform: [{scaleX: 1.1}, {scaleY: 1.1}],
  },
});

export default ManageStatus;
