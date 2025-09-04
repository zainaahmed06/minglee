import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {BackIcon} from "@/constants/MingleeIcons";
import {colors, fontSizes, radius, spacing} from "@/theme/";
import {router} from "expo-router";
import React, {useState} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ChangeUsername = () => {
  const [username, setUsername] = useState("andrew50");

  const handleGoBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Implement save functionality here
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <BackIcon color={colors.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Username</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Change Username</Text>

        <Input
          value={username}
          onValueChange={setUsername}
          variant='flat'
          style={styles.input}
        />

        <Text style={styles.helperText}>
          You can only change your username once every month.
        </Text>
      </View>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Button variant='solid' color='primary' fullWidth onPress={handleSave}>
          Save
        </Button>
      </View>
    </SafeAreaView>
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
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 28, // Same width as back button for alignment
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  helperText: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  buttonContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxxl,
  },
});

export default ChangeUsername;
