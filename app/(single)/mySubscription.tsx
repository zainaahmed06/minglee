import {LogoIcon} from "@/constants/OtherIcons";
import {colors, fontSizes, radius, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Types for subscription features
interface SubscriptionFeature {
  id: string;
  title: string;
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
    <Text style={styles.headerTitle}>Subscription</Text>
    <View style={styles.placeholder} />
  </View>
);

// Current plan header component
const CurrentPlanHeader: React.FC = () => (
  <View style={styles.planHeader}>
    <View style={styles.planTitleContainer}>
      <LogoIcon />
      <View style={styles.premiumBadge}>
        <Text style={styles.premiumText}>Premium</Text>
      </View>
    </View>
    <View style={styles.priceContainer}>
      <Text style={styles.priceText}>$9.99</Text>
      <Text style={styles.periodText}>/ Month</Text>
    </View>
  </View>
);

// Feature item component
const FeatureItem: React.FC<{feature: SubscriptionFeature}> = ({feature}) => (
  <View style={styles.featureItem}>
    <Ionicons
      name='checkmark'
      size={20}
      color={colors.success}
      style={styles.checkIcon}
    />
    <Text style={styles.featureText}>{feature.title}</Text>
  </View>
);

// Current plan status component
const CurrentPlanStatus: React.FC = () => (
  <View style={styles.planStatusContainer}>
    <Text style={styles.planStatusTitle}>Your current plan</Text>
    <Text style={styles.expirationText}>
      Your subscription will expire on Jan 22, 2024.
    </Text>
    <Text style={styles.renewalText}>
      Renew or cancel your subscription{" "}
      <Pressable
        onPress={() => console.log("Navigate to subscription management")}>
        <Text style={styles.hereLink}>here.</Text>
      </Pressable>
    </Text>
  </View>
);

const MySubscription: React.FC = () => {
  const subscriptionFeatures: SubscriptionFeature[] = [
    {id: "1", title: "All Free Membership Features"},
    {id: "2", title: "Unlimited Daily Swipes"},
    {id: "3", title: "Priority Profile Verification"},
    {id: "4", title: "Ad-Free Experience"},
    {id: "5", title: "See Who Likes Your Profile"},
    {id: "6", title: "Access to Read Receipts"},
    {id: "7", title: "Rewind Swipes (Undo)"},
    {id: "8", title: "Advanced Matching Filters"},
    {id: "9", title: "Boost Profile Visibility"},
    {id: "10", title: "In-App Customer Support"},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SubscriptionHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <CurrentPlanHeader />

          {/* Features List */}
          <View style={styles.featuresContainer}>
            {subscriptionFeatures.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
          </View>

          <CurrentPlanStatus />
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
    fontWeight: "600",
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
  planHeader: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  planTitleContainer: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",

    marginBottom: spacing.sm,
  },
  planBrandName: {
    fontSize: fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
    marginRight: spacing.md,
  },
  premiumBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  premiumText: {
    color: "white",
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceText: {
    fontSize: 48,
    fontWeight: "700",
    color: colors.text,
  },
  periodText: {
    fontSize: fontSizes.lg,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  featuresContainer: {
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  checkIcon: {
    marginRight: spacing.md,
  },
  featureText: {
    fontSize: fontSizes.md,
    color: colors.text,
    flex: 1,
  },
  planStatusContainer: {
    alignItems: "center",
    paddingTop: spacing.xl,
  },
  planStatusTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  expirationText: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  renewalText: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  hereLink: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default MySubscription;
