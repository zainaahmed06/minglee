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

const LifestyleSelection = () => {
  const router = useRouter();

  // State for lifestyle categories and their options
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "pets",
      title: "Pets",
      icon: "paw-outline",
      options: [
        {id: "none", label: "None"},
        {id: "dog", label: "Dog"},
        {id: "cat", label: "Cat", selected: true},
        {id: "fish", label: "Fish"},
        {id: "bird", label: "Bird"},
        {id: "rabbit", label: "Rabbit"},
        {id: "hamster", label: "Hamster"},
        {id: "reptile", label: "Reptile"},
        {id: "exotic", label: "Exotic Pet"},
        {id: "other", label: "Other"},
      ],
    },
    {
      id: "drinkingHabits",
      title: "Drinking Habits",
      icon: "wine-outline",
      options: [
        {id: "socialDrinker", label: "Social Drinker"},
        {id: "occasionalDrinker", label: "Occasional Drinker"},
        {id: "nonDrinker", label: "Non-Drinker", selected: true},
        {id: "wineEnthusiast", label: "Wine Enthusiast"},
        {id: "craftBeerLover", label: "Craft Beer Lover"},
        {id: "cocktailConnoisseur", label: "Cocktail Connoisseur"},
      ],
    },
    {
      id: "smokingHabits",
      title: "Smoking Habits",
      icon: "flame-outline",
      options: [
        {id: "smoker", label: "Smoker"},
        {id: "nonSmoker", label: "Non-Smoker", selected: true},
        {id: "quitter", label: "Quitter"},
        {id: "occasionalSmoker", label: "Occasional Smoker"},
        {id: "vapeEnthusiast", label: "Vape Enthusiast"},
      ],
    },
    {
      id: "workout",
      title: "Workout",
      icon: "barbell-outline",
      options: [
        {id: "everyday", label: "Everyday"},
        {id: "often", label: "Often"},
        {id: "sometimes", label: "Sometimes", selected: true},
        {id: "never", label: "Never"},
      ],
    },
    {
      id: "dietaryPreferences",
      title: "Dietary Preferences",
      icon: "restaurant-outline",
      options: [
        {id: "vegetarian", label: "Vegetarian", selected: true},
        {id: "vegan", label: "Vegan"},
        {id: "omnivore", label: "Omnivore"},
        {id: "pescatarian", label: "Pescatarian"},
        {id: "halal", label: "Halal"},
        {id: "glutenFree", label: "Gluten-Free"},
        {id: "dairyFree", label: "Dairy-Free"},
        {id: "plantBased", label: "Plant-Based"},
        {id: "keto", label: "Keto"},
        {id: "rawFood", label: "Raw Food"},
        {id: "kosher", label: "Kosher"},
        {id: "other", label: "Other"},
      ],
    },
    {
      id: "socialMediaPresence",
      title: "Social Media Presence",
      icon: "at-outline",
      options: [
        {id: "activeAll", label: "Active on All"},
        {id: "activeSome", label: "Active on Some", selected: true},
        {id: "minimal", label: "Minimal Social Media Presence"},
        {id: "influencer", label: "Social Media Influencer"},
      ],
    },
    {
      id: "sleepingHabits",
      title: "Sleeping Habits",
      icon: "bed-outline",
      options: [
        {id: "earlyBird", label: "Early Bird"},
        {id: "nightOwl", label: "Night Owl"},
        {id: "regularSleeper", label: "Regular Sleeper", selected: true},
        {id: "insomniac", label: "Insomniac"},
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
        <Text style={styles.headerTitle}>Lifestyle</Text>
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
    fontWeight: "700",
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
    fontWeight: "600",
  },
});

export default LifestyleSelection;
