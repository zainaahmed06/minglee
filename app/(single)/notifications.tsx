import {colors, fontSizes, radius, spacing} from "@/theme";
import {
  Notifications as NotificationsType,
  NotificationType,
  TargetType,
} from "@/types/appwrite.d";
import {useRouter} from "expo-router";
import LottieView from "lottie-react-native";
import React, {useEffect, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";

// Import lotties
import heartAnimation from "@/lotties/Heart.json";
import matchAnimation from "@/lotties/Match.json";
import messageAnimation from "@/lotties/Message.json";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";

const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulated data fetch - in a real app, this would come from Appwrite or your backend
    const mockNotifications: NotificationsType[] = [
      {
        $id: "1",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        $collectionId: "notifications",
        $databaseId: "minglee",
        $sequence: 1,
        user_id: "user123",
        NotificationType: NotificationType.MATCH,
        title: "New Match!",
        body: "You and Sarah have matched! Start a conversation now.",
        is_read: false,
        target_type: TargetType.APP,
      },
      {
        $id: "2",
        $createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        $updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        $permissions: [],
        $collectionId: "notifications",
        $databaseId: "minglee",
        $sequence: 2,
        user_id: "user123",
        NotificationType: NotificationType.LIKE,
        title: "New Like",
        body: "Alex liked your profile! Check them out.",
        is_read: true,
        target_type: TargetType.APP,
      },
      {
        $id: "3",
        $createdAt: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000
        ).toISOString(),
        $updatedAt: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000
        ).toISOString(),
        $permissions: [],
        $collectionId: "notifications",
        $databaseId: "minglee",
        $sequence: 3,
        user_id: "user123",
        NotificationType: NotificationType.MESSAGE,
        title: "New Message",
        body: "Jessica sent you a new message: 'Hey there! How's your day going?'",
        is_read: false,
        target_type: TargetType.APP,
      },
      {
        $id: "4",
        $createdAt: new Date(
          Date.now() - 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
        $updatedAt: new Date(
          Date.now() - 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
        $permissions: [],
        $collectionId: "notifications",
        $databaseId: "minglee",
        $sequence: 4,
        user_id: "user123",
        NotificationType: NotificationType.MATCH,
        title: "New Match!",
        body: "You and Mike have matched! Start a conversation now.",
        is_read: true,
        target_type: TargetType.APP,
      },
    ];

    // Simulate API call delay
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleNotificationPress = (notification: NotificationsType) => {
    // Mark notification as read
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
        <Text style={styles.emptyTitle}>No notifications yet</Text>
        <Text style={styles.emptySubtitle}>
          When you get matches, likes or messages, they&apos;ll appear here
        </Text>
      </View>
    );
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
    fontWeight: "600",
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
    fontWeight: "600",
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
    fontWeight: "500",
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
    fontWeight: "600",
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
