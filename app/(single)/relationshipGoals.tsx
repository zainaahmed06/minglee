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
import {colors, fontSizes, spacing} from "../../theme";

// Define relationship goal option type
interface GoalOption {
  id: string;
  title: string;
  emoji: string;
  description: string;
  selected?: boolean;
}

const RelationshipGoals = () => {
  const router = useRouter();

  // Define relationship goal options
  const [goals, setGoals] = useState<GoalOption[]>([
    {
      id: "dating",
      title: "Dating",
      emoji: "💑",
      description:
        "Seeking love and meaningful connections? Choose dating for genuine relationships.",
      selected: true,
    },
    {
      id: "friendship",
      title: "Friendship",
      emoji: "🙌",
      description:
        "Expand your social circle and make new friends. Opt for friendship today.",
    },
    {
      id: "casual",
      title: "Casual",
      emoji: "😊",
      description:
        "Looking for fun and relaxed encounters? Select casual for carefree connections.",
    },
    {
      id: "serious",
      title: "Serious Relationship",
      emoji: "💍",
      description:
        "Ready for commitment and a lasting partnership? Pick serious relationship.",
    },
    {
      id: "open",
      title: "Open to Options",
      emoji: "🌟",
      description:
        "Explore various connections and keep your options open with this choice.",
    },
    {
      id: "networking",
      title: "Networking",
      emoji: "🤝",
      description:
        "Connect professionally and expand your network. Choose networking now.",
    },
    {
      id: "exploration",
      title: "Exploration",
      emoji: "🌎",
      description:
        "Embark on a journey of discovery. Select exploration for new experiences.",
    },
  ]);

  // Handle goal selection
  const handleGoalSelection = (id: string) => {
    setGoals(
      goals.map((goal) => ({
        ...goal,
        selected: goal.id === id,
      }))
    );
  };

  // Handle save and return
  const handleSave = () => {
    // Here you would typically save the selection to a backend or state management
    // For now, we just navigate back
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
        <Text style={styles.headerTitle}>Relationship Goals</Text>
        <View style={styles.emptySpace} />
      </View>

      {/* Goals List */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[styles.goalCard, goal.selected && styles.selectedGoalCard]}
            onPress={() => handleGoalSelection(goal.id)}>
            <View style={styles.goalContent}>
              <Text style={styles.goalTitle}>
                {goal.title} {goal.emoji}
              </Text>
              <Text style={styles.goalDescription}>{goal.description}</Text>
            </View>
          </TouchableOpacity>
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
    paddingHorizontal: spacing.md,
  },
  goalCard: {
    borderWidth: 1,
    borderColor: colors.surfaceSecondary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.background,
  },
  selectedGoalCard: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
    borderWidth: 2,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "regular",
    marginBottom: spacing.xs,
    color: colors.text,
  },
  goalDescription: {
    fontSize: fontSizes.sm,
    color: colors.surfaceSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.surfaceSecondary,
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
    fontWeight: "medium",
  },
});

export default RelationshipGoals;
