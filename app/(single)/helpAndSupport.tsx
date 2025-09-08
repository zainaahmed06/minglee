import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

interface SupportItemProps {
  title: string;
  onPress: () => void;
}

const SupportItem: React.FC<SupportItemProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.supportItem}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.supportItemText}>{title}</Text>
      <Ionicons name='chevron-forward' size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );
};

const HelpAndSupport = () => {
  const handleItemPress = (item: string) => {
    // In a real app, navigate to the respective screens
    console.log(`Navigate to ${item}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Ionicons name='arrow-back' size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={{height: spacing.lg}} />
        <SupportItem title='FAQ' onPress={() => handleItemPress("FAQ")} />
        <SupportItem
          title='Contact Support'
          onPress={() => handleItemPress("Contact Support")}
        />
        <SupportItem
          title='Terms & Conditions'
          onPress={() => handleItemPress("Terms & Conditions")}
        />
        <SupportItem
          title='Privacy Policy'
          onPress={() => handleItemPress("Privacy Policy")}
        />
        <SupportItem
          title='Partner'
          onPress={() => handleItemPress("Partner")}
        />
        <SupportItem
          title='Job Vacancy'
          onPress={() => handleItemPress("Job Vacancy")}
        />
        <SupportItem
          title='Accessibility'
          onPress={() => handleItemPress("Accessibility")}
        />
        <SupportItem
          title='Feedback'
          onPress={() => handleItemPress("Feedback")}
        />
        <SupportItem
          title='About us'
          onPress={() => handleItemPress("About us")}
        />
        <SupportItem
          title='Rate us'
          onPress={() => handleItemPress("Rate us")}
        />
        <SupportItem
          title='Visit Our Website'
          onPress={() => handleItemPress("Visit Our Website")}
        />
        <SupportItem
          title='Follow us on Social Media'
          onPress={() => handleItemPress("Follow us on Social Media")}
        />
        <View style={{height: spacing.xxxl}} />
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
  supportItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  supportItemText: {
    fontSize: fontSizes.lg,
    color: colors.text,
  },
});

export default HelpAndSupport;
