import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Types for visibility options
interface VisibilityOption {
  id: string;
  title: string;
  value: "everyone" | "matches" | "nobody";
}

// Header component
const VisibilityHeader: React.FC = () => (
  <View style={styles.header}>
    <Pressable
      style={styles.backButton}
      onPress={() => router.back()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Ionicons name='arrow-back' size={24} color={colors.text} />
    </Pressable>
    <Text style={styles.headerTitle}>Visibility</Text>
    <View style={styles.placeholder} />
  </View>
);

// Radio button option component
const VisibilityOptionComponent: React.FC<{
  option: VisibilityOption;
  selectedValue: string;
  onSelect: (value: string) => void;
}> = ({option, selectedValue, onSelect}) => {
  const isSelected = selectedValue === option.value;

  return (
    <Pressable
      style={styles.optionContainer}
      onPress={() => onSelect(option.value)}>
      <Ionicons
        name={isSelected ? "radio-button-on" : "radio-button-off"}
        size={24}
        color={isSelected ? colors.primary : colors.border}
        style={styles.radioButton}
      />
      <Text style={styles.optionText}>{option.title}</Text>
    </Pressable>
  );
};

const Visibility: React.FC = () => {
  const [selectedVisibility, setSelectedVisibility] =
    useState<string>("everyone");

  const visibilityOptions: VisibilityOption[] = [
    {
      id: "1",
      title: "Everyone",
      value: "everyone",
    },
    {
      id: "2",
      title: "Only Matches",
      value: "matches",
    },
    {
      id: "3",
      title: "Nobody",
      value: "nobody",
    },
  ];

  const handleVisibilityChange = (value: string) => {
    setSelectedVisibility(value);
    // Here you can add logic to save the preference
    console.log("Visibility changed to:", value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <VisibilityHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.instructionText}>
            Choose who can see your profile:
          </Text>

          <View style={styles.optionsContainer}>
            {visibilityOptions.map((option) => (
              <VisibilityOptionComponent
                key={option.id}
                option={option}
                selectedValue={selectedVisibility}
                onSelect={handleVisibilityChange}
              />
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
  },
  instructionText: {
    fontSize: fontSizes.lg,
    fontFamily: "UrbanistMedium",
    color: colors.text,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: spacing.lg,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  radioButton: {
    marginRight: spacing.lg,
  },
  optionText: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontFamily: "UrbanistMedium",
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default Visibility;
