import {COLLECTIONS, DATABASES} from "@/constants/databases";
import {databases} from "@/services/appwrite";
import {useAuth} from "@/store/useAuth";
import {colors, fontSizes, radius, spacing} from "@/theme";
import {
  Notifications as NotificationsType,
  NotificationType,
} from "@/types/appwrite.d";
import {useRouter} from "expo-router";
import LottieView from "lottie-react-native";
import React, {useEffect, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {Query} from "react-native-appwrite";

// Import lotties
import heartAnimation from "@/lotties/Heart.json";
import matchAnimation from "@/lotties/Match.json";
import messageAnimation from "@/lotties/Message.json";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";

const Notifications = () => {
  const router = useRouter();
  const {user} = useAuth();
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setError("Please login to view notifications");
        setLoading(false);
        return;
      }

      try {
        const response = await databases.listDocuments(
          DATABASES.MAIN,
          COLLECTIONS.NOTIFICATIONS, // Collection ID for notifications
          [
            Query.equal("user_id", user.$id),
            Query.orderDesc("$createdAt"), // Show newest notifications first
            Query.limit(50), // Limit to 50 notifications
          ]
        );

        setNotifications(response.documents as NotificationsType[]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleNotificationPress = async (notification: NotificationsType) => {
    try {
      // Update notification status in Appwrite database
      await databases.updateDocument(
        DATABASES.MAIN,
        COLLECTIONS.NOTIFICATIONS,
        notification.$id,
        {
          is_read: true,
        }
      );

      // Update local state
      setNotifications((prevNotifications) =>
        prevNotifications.map((item) =>
          item.$id === notification.$id ? {...item, is_read: true} : item
        )
      );

      // Navigate based on notification type
      switch (notification.NotificationType) {
        case NotificationType.MATCH:
          router.push("/matches");
          break;
        case NotificationType.LIKE:
          router.push("/explore");
          break;
        case NotificationType.MESSAGE:
          router.push("/chats");
          break;
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
      // Still navigate even if the update failed
      switch (notification.NotificationType) {
        case NotificationType.MATCH:
          router.push("/matches");
          break;
        case NotificationType.LIKE:
          router.push("/explore");
          break;
        case NotificationType.MESSAGE:
          router.push("/chats");
          break;
      }
    }
  };

  const getNotificationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`;
    } else {
      return "Just now";
    }
  };

  const getNotificationAnimation = (notificationType: NotificationType) => {
    switch (notificationType) {
      case NotificationType.MATCH:
        return matchAnimation;
      case NotificationType.LIKE:
        return heartAnimation;
      case NotificationType.MESSAGE:
        return messageAnimation;
      default:
        return messageAnimation;
    }
  };

  const renderItem = ({item}: {item: NotificationsType}) => {
    return (
      <Pressable
        style={[
          styles.notificationItem,
          !item.is_read && styles.unreadNotification,
        ]}
        onPress={() => handleNotificationPress(item)}>
        <View style={styles.notificationIcon}>
          <LottieView
            source={getNotificationAnimation(item.NotificationType)}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationTime}>
              {getNotificationTime(item.$createdAt)}
            </Text>
          </View>
          <Text
            style={[
              styles.notificationBody,
              !item.is_read && styles.unreadText,
            ]}
            numberOfLines={2}>
            {item.body}
          </Text>
        </View>
        {!item.is_read && <View style={styles.unreadIndicator} />}
      </Pressable>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Ionicons name='arrow-back' size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <LottieView
          source={messageAnimation}
          autoPlay
          loop
          style={styles.emptyAnimation}
        />
        {error ? (
          <>
            <Text style={styles.emptyTitle}>{error}</Text>
            <Text style={styles.emptySubtitle}>Please try again later</Text>
          </>
        ) : (
          <>
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>
              When you get matches, likes or messages, they&apos;ll appear here
            </Text>
          </>
        )}
      </View>
    );
  };

  // Function to refresh notifications
  const refreshNotifications = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await databases.listDocuments(
        DATABASES.MAIN,
        COLLECTIONS.NOTIFICATIONS,
        [
          Query.equal("user_id", user.$id),
          Query.orderDesc("$createdAt"),
          Query.limit(50),
        ]
      );

      setNotifications(response.documents as NotificationsType[]);
      setLoading(false);
    } catch (err) {
      console.error("Error refreshing notifications:", err);
      setError("Failed to refresh notifications");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={messageAnimation}
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          onRefresh={refreshNotifications}
          refreshing={loading}
        />
      )}
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
  listContent: {
    padding: spacing.md,
    flexGrow: 1,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  unreadNotification: {
    backgroundColor: colors.backgroundSecondary,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundTertiary,
    marginRight: spacing.md,
  },
  lottieAnimation: {
    width: 40,
    height: 40,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  notificationTitle: {
    fontSize: fontSizes.md,
    fontFamily: "UrbanistBold",
    color: colors.text,
  },
  notificationTime: {
    fontSize: fontSizes.xs,
    color: colors.textTertiary,
  },
  notificationBody: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  unreadText: {
    fontFamily: "UrbanistMedium",
    color: colors.text,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    position: "absolute",
    top: 10,
    right: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyAnimation: {
    width: 150,
    height: 150,
  },
  emptyTitle: {
    fontSize: fontSizes.xl,
    fontFamily: "UrbanistBold",
    color: colors.text,
    marginVertical: spacing.md,
  },
  emptySubtitle: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
  loadingText: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});

export default Notifications;
