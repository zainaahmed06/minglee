import {Ionicons} from "@expo/vector-icons";
import {Stack, useRouter} from "expo-router";
import React, {useEffect, useState} from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EditHeader from "../../components/EditHeader";
import {SelectionTag} from "../../components/SelectionTag";
import {colors, spacing} from "../../theme";

// Mock data for languages
const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Chinese",
  "Korean",
  "Arabic",
  "Hindi",
  "Turkish",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Polish",
  "Czech",
  "Greek",
  "Hebrew",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Malay",
  "Tagalog",
  "Swahili",
].sort();

export default function LanguagesSelection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "English",
  ]);
  const [filteredLanguages, setFilteredLanguages] =
    useState<string[]>(LANGUAGES);

  // Filter languages based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLanguages(LANGUAGES);
    } else {
      const filtered = LANGUAGES.filter((language) =>
        language.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLanguages(filtered);
    }
  }, [searchQuery]);

  // Toggle language selection
  const toggleLanguageSelection = (language: string) => {
    if (selectedLanguages.includes(language)) {
      // Don't remove if it's the last selected language
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(
          selectedLanguages.filter((lang) => lang !== language)
        );
      }
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  // Save selected languages and go back
  const handleSave = () => {
    // Here you would typically save to a backend or state management
    // For now, we just go back
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <EditHeader
        title='Languages'
        onCancel={() => router.back()}
        onSave={handleSave}
      />

      <View style={styles.searchContainer}>
        <Ionicons
          name='search'
          size={20}
          color={colors.surfaceSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder='Search languages'
          placeholderTextColor={colors.surfaceSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name='close-circle'
              size={20}
              color={colors.surfaceSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredLanguages}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.languagesList}
        renderItem={({item}) => (
          <SelectionTag
            label={item}
            selected={selectedLanguages.includes(item)}
            onPress={() => toggleLanguageSelection(item)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    height: 44,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: colors.surfaceSecondary,
  },
  languagesList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
});
