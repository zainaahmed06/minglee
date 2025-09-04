import Button from "@/components/Button";
import {LogoIcon} from "@/constants/OtherIcons";
import {colors, fontSizes, radius, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Types for subscription plans
interface Feature {
  text: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  badgeColor?: string;
  features: Feature[];
  buttonText: string;
  buttonVariant: "solid" | "bordered";
  buttonColor: "primary" | "warning" | "secondary";
}

// Header component
const SubscriptionHeader: React.FC = () => (
  <View style={styles.header}>
    <Pressable
      style={styles.backButton}
      onPress={() => router.back()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Ionicons name='arrow-back' size={24} color={colors.text} />
    </Pressable>
    <Text style={styles.headerTitle}>Upgrade Membership</Text>
    <View style={styles.placeholder} />
  </View>
);

// Feature list item component
const FeatureItem: React.FC<{feature: Feature}> = ({feature}) => (
  <View style={styles.featureItem}>
    <Ionicons
      name={feature.included ? "checkmark" : "close"}
      size={16}
      color={feature.included ? colors.success : colors.textTertiary}
    />
    <Text
      style={[
        styles.featureText,
        !feature.included && styles.featureTextDisabled,
      ]}>
      {feature.text}
    </Text>
  </View>
);

// Subscription plan card component
const PlanCard: React.FC<{
  plan: SubscriptionPlan;
  onSelectPlan: (planId: string) => void;
  isSelected?: boolean;
}> = ({plan, onSelectPlan, isSelected = false}) => (
  <View style={[styles.planCard, isSelected && styles.selectedPlanCard]}>
    <View style={styles.planHeader}>
      <LogoIcon />
      {plan.badge && (
        <View
          style={[
            styles.planBadge,
            {
              backgroundColor:
                plan.badgeColor === "premium" ? colors.primary : colors.warning,
            },
          ]}>
          <Text style={styles.planBadgeText}>{plan.badge}</Text>
        </View>
      )}
    </View>

    <View style={styles.priceContainer}>
      <Text style={styles.priceText}>{plan.price}</Text>
      <Text style={styles.periodText}>{plan.period}</Text>
    </View>

    <View style={styles.featuresContainer}>
      {plan.features.map((feature, index) => (
        <FeatureItem key={index} feature={feature} />
      ))}
    </View>

    <Button
      variant={plan.buttonVariant}
      color={plan.buttonColor}
      fullWidth
      style={styles.planButton}
      onPress={() => onSelectPlan(plan.id)}>
      {plan.buttonText}
    </Button>
  </View>
);

const Subscriptions: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("free"); // Default to free plan

  // Subscription plans data
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      price: "Free",
      badge: "Basic",

      period: "",
      features: [
        {text: "Create and Edit Profile", included: true},
        {text: "Swipe Match", included: true},
        {text: "Limited Daily Swipes", included: true},
        {text: "Basic Profile Verification", included: true},
        {text: "Chat with Mutual Matches", included: true},
      ],
      buttonText: "Current Plan",
      buttonVariant: "bordered",
      buttonColor: "secondary",
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99",
      period: "/ Month",
      badge: "Premium",
      badgeColor: "premium",
      features: [
        {text: "All Free Membership Features", included: true},
        {text: "Unlimited Daily Swipes", included: true},
        {text: "Priority Profile Verification", included: true},
        {text: "Ad-Free Experience", included: true},
        {text: "See Who Likes Your Profile", included: true},
        {text: "Access to Read Receipts", included: true},
        {text: "Rewind Swipes (Undo)", included: true},
        {text: "Advanced Matching Filters", included: true},
        {text: "Boost Profile Visibility", included: true},
        {text: "In-App Customer Support", included: true},
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "solid",
      buttonColor: "primary",
    },
    {
      id: "gold",
      name: "Gold",
      price: "$24.99",
      period: "/ Quarter",
      badge: "Gold",
      badgeColor: "gold",
      features: [
        {text: "All Premium Membership Features", included: true},
        {text: "Exclusive Gold Badge on Profile", included: true},
        {text: "Additional Super Likes", included: true},
        {text: "Premium Customer Support", included: true},
        {text: "Access to User Activity Insights", included: true},
        {text: "Top-of-Stack Profile Placement", included: true},
        {text: "Travel Mode (Change Location)", included: true},
        {text: "Access to All Emojis and Stickers", included: true},
      ],
      buttonText: "Select Plan",
      buttonVariant: "solid",
      buttonColor: "warning",
    },
    {
      id: "platinum",
      name: "Platinum",
      price: "$89.99",
      period: "/ Year",
      badge: "Platinum",
      badgeColor: "premium",
      features: [
        {text: "All Gold Membership Features", included: true},
        {text: "VIP Platinum Badge on Profile", included: true},
        {text: "Priority Customer Support", included: true},
        {text: "Profile Highlight (Stand Out)", included: true},
        {text: "Extended Location Preferences", included: true},
        {text: "Profile Boost Credits", included: true},
        {text: "Exclusive Access to Datify Events", included: true},
        {text: "Advanced Safety Features", included: true},
        {text: "Access to Premium Blog Content", included: true},
      ],
      buttonText: "Select Plan",
      buttonVariant: "solid",
      buttonColor: "primary",
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    console.log(`Selected plan: ${planId}`);

    // Handle different plan selections
    if (planId === "free") {
      // Already on free plan
      return;
    }

    // Navigate to payment screen or process subscription
    // router.push(`/payment?plan=${planId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.background} />

      <SubscriptionHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {subscriptionPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelectPlan={handleSelectPlan}
            isSelected={selectedPlan === plan.id}
          />
        ))}

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
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 32, // Same as back button to center the title
  },
  scrollView: {
    paddingTop: spacing.xl,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  currentPlanContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  currentPlanBadge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    marginBottom: spacing.sm,
  },
  currentPlanBadgeText: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  currentPlanTitle: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  currentPlanSubtitle: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
  },
  planCard: {
    backgroundColor: colors.surfaceSecondary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  selectedPlanCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  planName: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  planBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  planBadgeText: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    color: colors.textInverse,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: spacing.lg,
  },
  priceText: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.text,
  },
  periodText: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  featuresContainer: {
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  featureText: {
    fontSize: fontSizes.md,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  featureTextDisabled: {
    color: colors.textTertiary,
  },
  planButton: {
    marginTop: spacing.sm,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default Subscriptions;
