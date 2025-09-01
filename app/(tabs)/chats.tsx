import MainHeader from "@/components/MainHeader";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Type definitions for better type checking
type ChatStatus = "online" | "offline" | "group" | string;

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isMuted: boolean;
  profilePic: string;
  status: ChatStatus;
}

const chats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, are we still meeting tomorrow?",
    time: "10:45 AM",
    unreadCount: 2,
    isMuted: false,
    profilePic:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    status: "online",
  },
  {
    id: 2,
    name: "Sarah Ali",
    lastMessage: "Got it, thanks!",
    time: "Yesterday",
    unreadCount: 5,
    isMuted: false,
    profilePic:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    status: "last seen today at 11:30 AM",
  },
  {
    id: 3,
    name: "Family Group",
    lastMessage: "Mom: Dinner is ready 🍲",
    time: "9:15 PM",
    unreadCount: 5,
    isMuted: true,
    profilePic:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    status: "group",
  },
  {
    id: 4,
    name: "Office Team",
    lastMessage: "Meeting rescheduled to Monday",
    time: "Monday",
    unreadCount: 0,
    isMuted: true,
    profilePic:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    status: "group",
  },
];

interface ChatItemProps {
  chat: Chat;
  onPress: (id: number) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({chat, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => onPress(chat.id)}
      activeOpacity={0.7}>
      {/* Profile Picture with Status Indicator */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: chat.profilePic}}
          style={styles.profilePic}
          defaultSource={require("@/assets/images/adaptive-icon.png")} // Fallback image if URI fails
        />
        {chat.status === "online" && <View style={styles.onlineStatus} />}
      </View>

      {/* Chat Content */}
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={styles.chatTime}>{chat.time}</Text>
        </View>

        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          <View style={styles.chatMeta}>
            {chat.isMuted && (
              <Ionicons
                name='volume-mute'
                size={16}
                color='#9CA3AF'
                style={styles.muteIcon}
              />
            )}
            {chat.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>
                  {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Chats = () => {
  const handleChatPress = (chatId: number) => {
    console.log(`Chat ${chatId} pressed`);
    // Navigation logic would go here
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />

      {chats.length > 0 ? (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <ChatItem chat={item} onPress={handleChatPress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name='chatbubble-ellipses-outline'
            size={60}
            color='#D1D5DB'
          />
          <Text style={styles.emptyText}>No chats yet</Text>
          <Text style={styles.emptySubtext}>
            Your conversations will appear here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  profileContainer: {
    position: "relative",
    marginRight: 12,
  },
  profilePic: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F4F6", // Placeholder color
  },
  onlineStatus: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#10B981", // Green for online
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "white",
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
    marginRight: 8,
  },
  chatMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  muteIcon: {
    marginRight: 6,
  },
  unreadBadge: {
    backgroundColor: "#9333EA", // Purple color
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
});

export default Chats;
