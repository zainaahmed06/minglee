import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Language = {
  id: string;
  name: string;
  flag: string;
};

const AppLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("english_us");

  const languages: Language[] = [
    {id: "english_us", name: "English (US)", flag: "🇺🇸"},
    {id: "english_uk", name: "English (UK)", flag: "🇬🇧"},
    {id: "mandarin", name: "Mandarin", flag: "🇨🇳"},
    {id: "spanish", name: "Spanish", flag: "🇪🇸"},
    {id: "hindi", name: "Hindi", flag: "🇮🇳"},
    {id: "french", name: "French", flag: "🇫🇷"},
    {id: "arabic", name: "Arabic", flag: "🇦🇪"},
    {id: "russian", name: "Russian", flag: "🇷🇺"},
    {id: "japanese", name: "Japanese", flag: "🇯🇵"},
  ];

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
    // In a real app, you would also update the app's language setting
  };

  const SettingsHeader: React.FC = () => (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Ionicons name='arrow-back' size={24} color={colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>Settings</Text>
      <View style={styles.placeholder} />
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <SettingsHeader />
      <ScrollView style={styles.scrollView}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageItem,
              selectedLanguage === language.id && styles.selectedLanguageItem,
            ]}
            onPress={() => handleLanguageSelect(language.id)}>
            <View style={styles.flagContainer}>
              <Text style={styles.flagEmoji}>{language.flag}</Text>
            </View>
            <Text style={styles.languageName}>{language.name}</Text>
            {selectedLanguage === language.id && (
              <Ionicons
                name='checkmark'
                size={24}
                color={colors.primary}
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    margin: spacing.md,
  },
  selectedLanguageItem: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: "rgba(150, 16, 255, 0.05)",
  },
  flagContainer: {
    width: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.lg,
  },
  flagEmoji: {
    fontSize: 24,
  },
  languageName: {
    fontSize: fontSizes.lg,
    color: colors.text,
    flex: 1,
  },
  checkIcon: {
    marginLeft: spacing.md,
  },
});

export default AppLanguage;
