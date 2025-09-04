import EmailNotifications from "@/components/EmailNotifications";
import NotificationsList from "@/components/NotificationsList";
import SwitchButton from "@/components/SwitchButton";
import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Matches = () => {
  const [isPushActive, setIsPushNotifications] = useState(true);
  const tabs = [
    {
      key: "pushNotifications",
      title: "Push Notifications",
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
    },
  ];

  const handleTabPress = (index: number) => {
    if (index === 0) {
      setIsPushNotifications(true);
    } else {
      setIsPushNotifications(false);
    }
  };

  // Header component
  const PrivacyHeader: React.FC = () => (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Ionicons name='arrow-back' size={24} color={colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>Notifications Settings</Text>
      <View style={styles.placeholder} />
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <PrivacyHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: spacing.lg}} />
        <SwitchButton
          tabs={tabs}
          activeColor={colors.primary}
          inactiveColor={colors.surfaceSecondary}
          onTabPress={handleTabPress}
          initialTabIndex={0}
        />
        <View style={{height: spacing.lg}} />
        {isPushActive ? <NotificationsList /> : <EmailNotifications />}
        <View style={{height: spacing.lg}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default Matches;
