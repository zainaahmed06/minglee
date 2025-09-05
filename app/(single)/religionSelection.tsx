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
import {SelectionTag} from "../../components/SelectionTag";
import {colors, fontSizes, spacing} from "../../theme";

// Define religion type
interface Religion {
  id: string;
  name: string;
  selected?: boolean;
}

const ReligionSelection = () => {
  const router = useRouter();

  // Define religions list
  const [religions, setReligions] = useState<Religion[]>([
    {id: "christianity", name: "Christianity", selected: true},
    {id: "islam", name: "Islam"},
    {id: "hinduism", name: "Hinduism"},
    {id: "buddhism", name: "Buddhism"},
    {id: "secular", name: "Secular/Atheist/Agnostic"},
    {id: "chinese", name: "Chinese Traditional Religion"},
    {id: "sikhism", name: "Sikhism"},
    {id: "diasporic", name: "Diasporic Religions"},
    {id: "spiritism", name: "Spiritism"},
    {id: "judaism", name: "Judaism"},
    {id: "bahai", name: "Bahá'í"},
    {id: "jainism", name: "Jainism"},
    {id: "shinto", name: "Shinto"},
    {id: "caodai", name: "Cao Dai"},
    {id: "other", name: "Other"},
  ]);

  // Handle religion selection
  const handleReligionSelection = (id: string) => {
    setReligions(
      religions.map((religion) => ({
        ...religion,
        selected: religion.id === id,
      }))
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
        <Text style={styles.headerTitle}>Religion</Text>
        <View style={styles.emptySpace} />
      </View>

      {/* Religion Tags */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.tagsContainer}
        showsVerticalScrollIndicator={false}>
        {religions.map((religion) => (
          <SelectionTag
            key={religion.id}
            label={religion.name}
            selected={religion.selected}
            onPress={() => handleReligionSelection(religion.id)}
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
    fontWeight: "bold",
    color: colors.text,
  },
  emptySpace: {
    width: 40, // To balance the back button width
  },
  scrollContainer: {
    flex: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
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
    borderTopColor: colors.surfaceSecondary,
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
    fontWeight: "medium",
  },
});

export default ReligionSelection;
