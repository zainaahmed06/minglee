import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Toggle from "react-native-reanimated-toggle";

const ManageMessages = () => {
  const [receiveDirectMessages, setReceiveDirectMessages] =
    useState<boolean>(true);
  const [readReceipts, setReadReceipts] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Messages</Text>
      </View>

      {/* Direct Messages Option */}
      <View style={styles.optionContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.optionTitle}>Receive Direct Messages</Text>
          <Text style={styles.optionDescription}>
            If this is turned off, your matches will have to send a connection
            request to you in order to connect in the message.
          </Text>
        </View>

        <Toggle
          toggled={receiveDirectMessages}
          onChange={() => setReceiveDirectMessages(!receiveDirectMessages)}
          thumbOffset={4}
          activeTrackColor={colors.primary}
          inActiveTrackColor={colors.border}
          trackStyle={{height: 30, width: 48}}
          thumbSize={20}
        />
      </View>

      {/* Read Receipts Option */}
      <View style={styles.optionContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.optionTitle}>Read Receipts</Text>
          <Text style={styles.optionDescription}>
            If turned off, you won&apos;t send or receive read receipts.
          </Text>
        </View>
        <Toggle
          toggled={readReceipts}
          onChange={() => setReadReceipts(!readReceipts)}
          thumbOffset={4}
          activeTrackColor={colors.primary}
          inActiveTrackColor={colors.border}
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
    fontWeight: "600",
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
    fontWeight: "500",
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

export default ManageMessages;
