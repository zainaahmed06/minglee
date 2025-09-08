import {Ionicons} from "@expo/vector-icons";
import {Stack, useRouter} from "expo-router";
import React, {useState} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {BasicInfoCategory} from "../../components/BasicInfoCategory";
import {colors, fontSizes, spacing} from "../../theme";

// Define the option interface
interface Option {
  id: string;
  label: string;
  selected?: boolean;
}

// Define the category interface
interface Category {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  options: Option[];
}

const BasicInformation = () => {
  const router = useRouter();

  // State for categories and their options
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "zodiac",
      title: "Zodiac",
      icon: "time-outline",
      options: [
        {id: "aries", label: "Aries"},
        {id: "taurus", label: "Taurus"},
        {id: "gemini", label: "Gemini"},
        {id: "cancer", label: "Cancer"},
        {id: "leo", label: "Leo"},
        {id: "virgo", label: "Virgo"},
        {id: "libra", label: "Libra"},
        {id: "scorpio", label: "Scorpio"},
        {id: "sagittarius", label: "Sagittarius"},
        {id: "capricorn", label: "Capricorn", selected: true},
        {id: "aquarius", label: "Aquarius"},
        {id: "pisces", label: "Pisces"},
      ],
    },
    {
      id: "education",
      title: "Education",
      icon: "school-outline",
      options: [
        {id: "highschool", label: "High School"},
        {id: "bachelors", label: "Bachelors", selected: true},
        {id: "masters", label: "Masters"},
        {id: "phd", label: "PhD"},
        {id: "tradeschool", label: "Trade School"},
        {id: "other", label: "Other"},
      ],
    },
    {
      id: "familyPlans",
      title: "Family Plans",
      icon: "people-outline",
      options: [
        {id: "wantKids", label: "Want Kids"},
        {id: "dontWantKids", label: "Don't Want Kids"},
        {id: "notSureYet", label: "Not Sure Yet", selected: true},
      ],
    },
    {
      id: "covidVaccine",
      title: "COVID Vaccine",
      icon: "medical-outline",
      options: [
        {id: "vaccinated", label: "Vaccinated", selected: true},
        {id: "unvaccinated", label: "Unvaccinated"},
        {id: "preferNotToSay", label: "Prefer Not to Say"},
      ],
    },
    {
      id: "personalityType",
      title: "Personality Type",
      icon: "person-outline",
      options: [
        {id: "intj", label: "INTJ"},
        {id: "intp", label: "INTP", selected: true},
        {id: "entj", label: "ENTJ"},
        {id: "entp", label: "ENTP"},
        {id: "infj", label: "INFJ"},
        {id: "infp", label: "INFP"},
        {id: "enfj", label: "ENFJ"},
        {id: "enfp", label: "ENFP"},
        {id: "istj", label: "ISTJ"},
        {id: "isfj", label: "ISFJ"},
        {id: "estj", label: "ESTJ"},
        {id: "esfj", label: "ESFJ"},
        {id: "istp", label: "ISTP"},
        {id: "isfp", label: "ISFP"},
        {id: "estp", label: "ESTP"},
        {id: "esfp", label: "ESFP"},
      ],
    },
    {
      id: "communicationStyle",
      title: "Communication Style",
      icon: "chatbubble-ellipses-outline",
      options: [
        {id: "chattyCathy", label: "Chatty Cathy"},
        {id: "listener", label: "Listener", selected: true},
        {id: "joker", label: "Joker"},
        {id: "deepThinker", label: "Deep Thinker"},
        {id: "sarcasticWit", label: "Sarcastic Wit"},
        {id: "easygoing", label: "Easygoing"},
        {id: "straightShooter", label: "Straight Shooter"},
        {id: "storyteller", label: "Storyteller"},
      ],
    },
    {
      id: "loveStyle",
      title: "Love Style",
      icon: "heart-outline",
      options: [
        {id: "hopelessRomantic", label: "Hopeless Romantic"},
        {id: "adventureSeeker", label: "Adventure Seeker", selected: true},
        {id: "bestFriend", label: "Best Friend"},
        {id: "independentSpirit", label: "Independent Spirit"},
        {id: "caregiver", label: "Caregiver"},
        {id: "spontaneousAdventurer", label: "Spontaneous Adventurer"},
        {id: "classicLover", label: "Classic Lover"},
        {id: "analyticalLover", label: "Analytical Lover"},
      ],
    },
    {
      id: "bloodType",
      title: "Blood Type",
      icon: "water-outline",
      options: [
        {id: "a", label: "A"},
        {id: "b", label: "B"},
        {id: "ab", label: "AB"},
        {id: "o", label: "O", selected: true},
      ],
    },
  ]);

  // Handle option selection
  const handleOptionSelect = (categoryId: string, optionId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => ({
              ...option,
              selected: option.id === optionId,
            })),
          };
        }
        return category;
      })
    );
  };

  // Handle save and go back
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

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basics</Text>
        <View style={styles.emptySpace} />
      </View>

      {/* Categories */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}>
        {categories.map((category) => (
          <BasicInfoCategory
            key={category.id}
            categoryId={category.id}
            title={category.title}
            icon={category.icon}
            options={category.options}
            onOptionSelect={handleOptionSelect}
          />
        ))}

        {/* Bottom spacing */}
        <View style={{height: 100}} />
      </ScrollView>

      {/* OK Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.okButton} onPress={handleSave}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
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
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontFamily: "UrbanistBold",
    color: colors.text,
  },
  emptySpace: {
    width: 40, // To balance the back button width
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: spacing.md,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  okButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  okButtonText: {
    color: colors.background,
    fontSize: fontSizes.lg,
    fontFamily: "UrbanistBold",
  },
});

export default BasicInformation;
