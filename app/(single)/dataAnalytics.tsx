import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Types for analytics items
interface AnalyticsItem {
  id: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

// Header component
const AnalyticsHeader: React.FC = () => (
  <View style={styles.header}>
    <Pressable
      style={styles.backButton}
      onPress={() => router.back()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Ionicons name='arrow-back' size={24} color={colors.text} />
    </Pressable>
    <Text style={styles.headerTitle}>Data & Analytics</Text>
    <View style={styles.placeholder} />
  </View>
);

// Analytics item component
const AnalyticsItemComponent: React.FC<{item: AnalyticsItem}> = ({item}) => (
  <Pressable style={styles.analyticsItem} onPress={item.onPress}>
    <View style={styles.analyticsContent}>
      <Text style={styles.analyticsTitle}>{item.title}</Text>
      <Text style={styles.analyticsSubtitle}>{item.subtitle}</Text>
    </View>
    <Ionicons name='chevron-forward' size={16} color={colors.textTertiary} />
  </Pressable>
);

const DataAnalytics: React.FC = () => {
  const analyticsItems: AnalyticsItem[] = [
    {
      id: "data-usage",
      title: "Data Usage",
      subtitle:
        "Control how your data is used for analytics. Customize your preferences.",
      onPress: () => {
        console.log("Navigate to Data Usage settings");
        // router.push('/analytics/data-usage');
      },
    },
    {
      id: "ad-preferences",
      title: "Ad Preferences",
      subtitle:
        "Manage ad personalization settings. Tailor your ad experience.",
      onPress: () => {
        console.log("Navigate to Ad Preferences");
        // router.push('/analytics/ad-preferences');
      },
    },
    {
      id: "download-data",
      title: "Download My Data",
      subtitle: "Request a copy of your data. Your information, your control.",
      onPress: () => {
        console.log("Navigate to Download Data");
        // router.push('/analytics/download-data');
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AnalyticsHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.analyticsContainer}>
          {analyticsItems.map((item) => (
            <AnalyticsItemComponent key={item.id} item={item} />
          ))}
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
  analyticsContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  analyticsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
  },
  analyticsContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  analyticsTitle: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  analyticsSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default DataAnalytics;
