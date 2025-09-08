import {useChat} from "@/store/useChatContext";
import {colors} from "@/theme";
import {formatChatTime} from "@/utils/chatHelpers";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React, {useEffect} from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {Channel} from "stream-chat";

// Type definitions for better type checking
type ChatStatus = "online" | "offline" | "away" | string;

interface ChatItemProps {
  channel: Channel;
  onPress: (channelId: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({channel, onPress}) => {
  // Extract channel data
  const otherUser = Object.values(channel.state.members || {}).find(
    (member) => member.user?.id !== channel._client.userID
  )?.user || null;

  const lastMessage = channel.state.messages[channel.state.messages.length - 1];
  const unreadCount = channel.state.unreadCount || 0;
  const isChannelMuted = channel.muteStatus().muted;

  // Channel name logic - use the other user's name or a fallback
  const channelName = otherUser?.name || "Chat";

  // Profile image - use the other user's image or fallback
  const profilePic =
    otherUser?.image || "https://randomuser.me/api/portraits/lego/1.jpg";

  // Get other user's online status
  const isOnline = otherUser?.online || false;
  const status = isOnline ? "online" : "offline";

  // Format last message preview text
  const getLastMessageText = () => {
    if (!lastMessage) return "No messages yet";

    if (lastMessage.attachments && lastMessage.attachments.length > 0) {
      // Handle different attachment types
      const attachment = lastMessage.attachments[0];
      if (attachment.type === "image") {
        return "📷 Image";
      } else if (attachment.type === "video") {
        return "🎥 Video";
      } else if (attachment.type === "file") {
        return "📎 File";
      } else if (attachment.type === "audio") {
        return "🎵 Audio";
      } else if (attachment.type === "location") {
        return "📍 Location";
      }
      return "Attachment";
    }

    return lastMessage.text || "New message";
  };

  // Format message time
  const messageTime = lastMessage?.created_at
    ? formatChatTime(new Date(lastMessage.created_at).toISOString())
    : "";

  return (
    <Pressable style={styles.chatItem} onPress={() => onPress(channel.cid)}>
      {/* Profile Picture with Status Indicator */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: profilePic}}
          style={styles.profilePic}
          defaultSource={require("@/assets/images/MingleeLogo.png")} // Fallback image if URI fails
        />
        {status === "online" && <View style={styles.onlineStatus} />}
      </View>

      {/* Chat Content */}
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>
            {channelName}
          </Text>
          <Text style={styles.chatTime}>{messageTime}</Text>
        </View>

        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {getLastMessageText()}
          </Text>
          <View style={styles.chatMeta}>
            {isChannelMuted && (
              <Ionicons
                name='volume-mute'
                size={16}
                color='#9CA3AF'
                style={styles.muteIcon}
              />
            )}
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const ChatList = () => {
  const {
    channels,
    isConnecting,
    isConnected,
    error,
    refreshChannels,
    setActiveChannel,
  } = useChat();

  useEffect(() => {
    if (isConnected) {
      refreshChannels();
    }
  }, [isConnected, refreshChannels]);

  const handleChatPress = (channelId: string) => {
    // Find the channel
    const channel = channels.find((c) => c.cid === channelId);

    if (channel) {
      // Set as active channel
      setActiveChannel(channel);

      // Navigate to chat screen
      router.push({
        pathname: "(single)/chatConversation",
        params: {channelId: channel.id},
      });
    }
  };

  if (isConnecting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={colors.primary} />
        <Text style={styles.loadingText}>Loading chats...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name='alert-circle-outline' size={60} color='#D1D5DB' />
        <Text style={styles.emptyText}>Could not load chats</Text>
        <Text style={styles.emptySubtext}>{error.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refreshChannels()}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      {channels.length > 0 ? (
        <FlatList
          data={channels}
          keyExtractor={(item) => item.cid}
          renderItem={({item}) => (
            <ChatItem channel={item} onPress={handleChatPress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={isConnecting}
          onRefresh={refreshChannels}
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
            Match with someone to start chatting
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: "UrbanistBold",
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
    fontFamily: "UrbanistBold",
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
    fontFamily: "UrbanistBold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    minHeight: 300,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "UrbanistBold",
    color: "#374151",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    minHeight: 300,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "UrbanistMedium",
    color: "#6B7280",
    marginTop: 16,
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#9333EA",
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontSize: 14,
    fontFamily: "UrbanistBold",
  },
});

export default ChatList;
