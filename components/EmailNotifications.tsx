import {colors, fontSizes, spacing} from "@/theme";
import React, {useState} from "react";
import {StyleSheet, Switch, Text, View} from "react-native";

interface NotificationItem {
  id: string;
  title: string;
  enabled: boolean;
}

const EmailNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {id: "new-matches", title: "New Matches", enabled: true},
    {id: "new-messages", title: "New Messages", enabled: true},
    {id: "likes-super-likes", title: "Likes & Super Likes", enabled: true},
    {id: "profile-visitors", title: "Profile Visitors", enabled: false},
    {id: "events-activities", title: "Events and Activities", enabled: false},
    {id: "matches-activity", title: "Matches' Activity", enabled: true},
    {
      id: "safety-account-alerts",
      title: "Safety & Account Alerts",
      enabled: true,
    },
    {id: "promotions-news", title: "Promotions & News", enabled: false},
    {
      id: "in-app-recommendations",
      title: "In-App Recommendations",
      enabled: false,
    },
    {
      id: "weekly-activity-summary",
      title: "Weekly Activity Summary",
      enabled: false,
    },
    {id: "connection-requests", title: "Connection Requests", enabled: true},
    {
      id: "survey-feedback-requests",
      title: "Survey & Feedback Requests",
      enabled: false,
    },
    {id: "special-offers", title: "Special Offers", enabled: false},
  ]);

  const handleToggle = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? {...item, enabled: !item.enabled} : item
      )
    );
  };

  return (
    <View style={styles.container}>
      {notifications.map((item) => (
        <View key={item.id} style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Switch
            value={item.enabled}
            onValueChange={() => handleToggle(item.id)}
            trackColor={{false: colors.border, true: colors.primary}}
            thumbColor={item.enabled ? colors.background : colors.textTertiary}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  notificationTitle: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: "500",
    flex: 1,
  },
});

export default EmailNotifications;
