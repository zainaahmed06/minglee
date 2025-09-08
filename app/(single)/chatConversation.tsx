import {useChat} from "@/store/useChatContext";
import {colors, fontSizes, spacing} from "@/theme";
import {formatChatTime} from "@/utils/chatHelpers";
import {Ionicons} from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {useLocalSearchParams, useRouter} from "expo-router";
import React, {useEffect, useRef, useState} from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useToast} from "react-native-toast-notifications";

// Message type definition
interface MessageItem {
  id: string;
  text: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  attachments?: {
    type: "image" | "video" | "file" | "audio" | "location";
    title?: string;
    image_url?: string;
    asset_url?: string;
    thumb_url?: string;
    mime_type?: string;
    file_size?: number;
  }[];
  isRead?: boolean;
  isSystem?: boolean;
  deleted?: boolean;
}

const ChatConversation = () => {
  const {channelId} = useLocalSearchParams();
  const {channels, client} = useChat();
  const router = useRouter();
  const toast = useToast();

  // Find the channel from the ID
  const channel = channels.find((c) => c.id === (channelId as string));

  // States
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isAttaching, setIsAttaching] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Refs
  const flatListRef = useRef<FlatList<MessageItem>>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set up listeners for the channel
  useEffect(() => {
    if (!channel || !client) {
      router.back();
      return;
    }

    setIsLoading(true);

    // Load initial messages
    const loadMessages = async () => {
      try {
        const response = await channel.query({
          messages: {limit: 50},
          watch: true,
        });

        // Transform messages to our format
        const formattedMessages = response.messages.map((msg) => ({
          id: msg.id,
          text: msg.text || "",
          createdAt: new Date(msg.created_at as any),
          user: {
            id: msg.user?.id || "unknown",
            name: msg.user?.name || "Unknown User",
            avatar: msg.user?.image,
          },
          attachments: msg.attachments as MessageItem["attachments"],
          isRead: msg.status === "read",
          deleted: msg.type === "deleted",
          isSystem: msg.type === "system",
        }));

        setMessages(formattedMessages.reverse());
        setIsLoading(false);

        // Mark channel as read
        channel.markRead();
      } catch (err) {
        console.error("Error loading messages:", err);
        toast.show("Failed to load messages", {type: "danger"});
        setIsLoading(false);
      }
    };

    loadMessages();

    // Listen for new messages
    const unsubscribeNewMessage = channel.on("message.new", (event: any) => {
      setMessages((prevMessages) => {
        // Check if message already exists to prevent duplicates
        const messageExists = prevMessages.some(
          (msg) => msg.id === event.message.id
        );
        if (messageExists) return prevMessages;

        const newMessage: MessageItem = {
          id: event.message.id,
          text: event.message.text || "",
          createdAt: new Date(event.message.created_at),
          user: {
            id: event.message.user?.id || "unknown",
            name: event.message.user?.name || "Unknown User",
            avatar: event.message.user?.image,
          },
          attachments: event.message.attachments as MessageItem["attachments"],
          isRead: false,
        };

        return [newMessage, ...prevMessages];
      });

      // Mark message as read
      channel.markRead();
    });

    // Listen for updated messages
    const unsubscribeUpdateMessage = channel.on(
      "message.updated",
      (event: any) => {
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => {
            if (msg.id === event.message.id) {
              return {
                ...msg,
                text: event.message.text || msg.text,
                attachments: event.message
                  .attachments as MessageItem["attachments"],
                deleted: event.message.type === "deleted",
              };
            }
            return msg;
          });
        });
      }
    );

    // Listen for deleted messages
    const unsubscribeDeleteMessage = channel.on(
      "message.deleted",
      (event: any) => {
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => {
            if (msg.id === event.message.id) {
              return {
                ...msg,
                text: "This message was deleted",
                deleted: true,
              };
            }
            return msg;
          });
        });
      }
    );

    // Listen for read receipts
    const unsubscribeReadReceipt = channel.on("message.read", () => {
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => ({
          ...msg,
          isRead: true,
        }));
      });
    });

    // Listen for typing indicators
    const unsubscribeTypingStart = channel.on("typing.start", (event: any) => {
      if (event.user.id !== client.userID) {
        setIsTyping(true);
      }
    });

    const unsubscribeTypingStop = channel.on("typing.stop", (event: any) => {
      if (event.user.id !== client.userID) {
        setIsTyping(false);
      }
    });

    // Clean up listeners
    return () => {
      unsubscribeNewMessage.unsubscribe();
      unsubscribeUpdateMessage.unsubscribe();
      unsubscribeDeleteMessage.unsubscribe();
      unsubscribeReadReceipt.unsubscribe();
      unsubscribeTypingStart.unsubscribe();
      unsubscribeTypingStop.unsubscribe();

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [channel, client, router, toast]);

  // Handle sending messages
  const sendMessage = async () => {
    if (!channel || !inputText.trim()) return;

    try {
      await channel.sendMessage({
        text: inputText.trim(),
      });

      // Clear input
      setInputText("");
    } catch (err) {
      console.error("Error sending message:", err);
      toast.show("Failed to send message", {type: "danger"});
    }
  };

  // Handle typing indicator
  const handleInputChange = (text: string) => {
    setInputText(text);

    // Send typing start event
    if (channel && text) {
      channel.keystroke();
    }

    // Set typing stop timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (channel) {
        channel.stopTyping();
      }
    }, 3000) as unknown as NodeJS.Timeout;
  };

  // Handle attachment picker
  const toggleAttachmentPicker = () => {
    Keyboard.dismiss();
    setIsPickerOpen(!isPickerOpen);
  };

  // Handle image upload
  const pickImage = async () => {
    setIsPickerOpen(false);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        sendImageMessage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Error picking image:", err);
      toast.show("Failed to select image", {type: "danger"});
    }
  };

  // Handle camera
  const takePhoto = async () => {
    setIsPickerOpen(false);

    try {
      const {status} = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        toast.show("Camera permission is required", {type: "warning"});
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        sendImageMessage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Error taking photo:", err);
      toast.show("Failed to take photo", {type: "danger"});
    }
  };

  // Handle sending image messages
  const sendImageMessage = async (uri: string) => {
    if (!channel) return;

    try {
      setIsAttaching(true);

      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error("File does not exist");
      }

      // Create unique filename
      const fileName = uri.split("/").pop() || `image-${Date.now()}.jpg`;

      // Send the image message
      await channel.sendMessage({
        text: "",
        attachments: [
          {
            type: "image" as "image",
            image_url: uri,
            title: fileName,
            mime_type: "image/jpeg",
            file_size: fileInfo.size,
          },
        ],
      });
    } catch (err) {
      console.error("Error sending image message:", err);
      toast.show("Failed to send image", {type: "danger"});
    } finally {
      setIsAttaching(false);
    }
  };

  // Render message item
  const renderMessage = ({item}: {item: MessageItem}) => {
    const isCurrentUser = item.user.id === client?.userID;

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
        ]}>
        {!isCurrentUser && (
          <Image
            source={{
              uri:
                item.user.avatar ||
                "https://randomuser.me/api/portraits/lego/1.jpg",
            }}
            style={styles.avatarImage}
          />
        )}

        <View
          style={[
            styles.messageBubble,
            isCurrentUser
              ? styles.userMessageBubble
              : styles.otherMessageBubble,
            item.deleted && styles.deletedMessageBubble,
          ]}>
          {item.attachments &&
            item.attachments.length > 0 &&
            item.attachments[0].type === "image" && (
              <Pressable style={styles.imageContainer}>
                <Image
                  source={{uri: item.attachments[0].image_url || ""}}
                  style={styles.messageImage}
                  resizeMode='cover'
                />
              </Pressable>
            )}

          {item.text !== "" && (
            <Text
              style={[
                styles.messageText,
                item.deleted && styles.deletedMessageText,
              ]}>
              {item.text}
            </Text>
          )}

          <Text style={styles.messageTime}>
            {formatChatTime(item.createdAt.toISOString())}
            {isCurrentUser && item.isRead && " ✓✓"}
          </Text>
        </View>
      </View>
    );
  };

  // Get the other user for the header
  const otherUser = channel
    ? Object.values(channel.state.members || {}).find(
        (member) => member.user?.id !== client?.userID
      )?.user || null
    : null;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color={colors.text} />
        </Pressable>

        <View style={styles.headerContent}>
          <Image
            source={{
              uri:
                otherUser?.image ||
                "https://randomuser.me/api/portraits/lego/1.jpg",
            }}
            style={styles.headerAvatar}
          />

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerName}>{otherUser?.name || "Chat"}</Text>

            {isTyping ? (
              <Text style={styles.typingIndicator}>typing...</Text>
            ) : otherUser?.online ? (
              <Text style={styles.onlineText}>Online</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton}>
            <Ionicons name='call-outline' size={22} color={colors.primary} />
          </Pressable>

          <Pressable style={styles.headerButton}>
            <Ionicons
              name='ellipsis-vertical'
              size={22}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>
      </View>

      {/* Message List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={colors.primary} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          inverted
        />
      )}

      {/* Attachment Picker */}
      {isPickerOpen && (
        <View style={styles.attachmentPicker}>
          <Pressable style={styles.attachmentOption} onPress={takePhoto}>
            <View
              style={[
                styles.attachmentIconContainer,
                {backgroundColor: "#FF6B6B"},
              ]}>
              <Ionicons name='camera' size={24} color='white' />
            </View>
            <Text style={styles.attachmentText}>Camera</Text>
          </Pressable>

          <Pressable style={styles.attachmentOption} onPress={pickImage}>
            <View
              style={[
                styles.attachmentIconContainer,
                {backgroundColor: "#4ECDC4"},
              ]}>
              <Ionicons name='image' size={24} color='white' />
            </View>
            <Text style={styles.attachmentText}>Gallery</Text>
          </Pressable>

          <Pressable style={styles.attachmentOption}>
            <View
              style={[
                styles.attachmentIconContainer,
                {backgroundColor: "#45B8AC"},
              ]}>
              <Ionicons name='location' size={24} color='white' />
            </View>
            <Text style={styles.attachmentText}>Location</Text>
          </Pressable>

          <Pressable style={styles.attachmentOption}>
            <View
              style={[
                styles.attachmentIconContainer,
                {backgroundColor: "#FF8C42"},
              ]}>
              <Ionicons name='document' size={24} color='white' />
            </View>
            <Text style={styles.attachmentText}>Document</Text>
          </Pressable>
        </View>
      )}

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={toggleAttachmentPicker}
            style={styles.attachButton}>
            <Ionicons
              name='add-circle-outline'
              size={26}
              color={colors.primary}
            />
          </Pressable>

          <TextInput
            style={styles.textInput}
            placeholder='Type a message...'
            value={inputText}
            onChangeText={handleInputChange}
            multiline
          />

          {inputText.trim() ? (
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Ionicons name='send' size={24} color='white' />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name='mic-outline' size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Loading Overlay for Attachments */}
      {isAttaching && (
        <View style={styles.attachingOverlay}>
          <ActivityIndicator size='large' color='white' />
          <Text style={styles.attachingText}>Sending attachment...</Text>
        </View>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: spacing.xs,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerName: {
    fontSize: fontSizes.md,
    fontFamily: "UrbanistBold",
    color: colors.text,
  },
  typingIndicator: {
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  onlineText: {
    fontSize: fontSizes.sm,
    color: "#10B981", // Green
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 8,
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageList: {
    padding: spacing.md,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: spacing.sm,
    maxWidth: "90%",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.xs,
    alignSelf: "flex-end",
  },
  messageBubble: {
    padding: spacing.sm,
    borderRadius: 16,
    maxWidth: "80%",
  },
  userMessageBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: "#F3F4F6",
    borderBottomLeftRadius: 4,
  },
  deletedMessageBubble: {
    backgroundColor: "#F3F3F3",
  },
  messageText: {
    fontSize: fontSizes.md,
    color: "white",
  },
  deletedMessageText: {
    fontStyle: "italic",
    color: colors.textSecondary,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    textAlign: "right",
    color: "rgba(255, 255, 255, 0.7)",
  },
  imageContainer: {
    marginBottom: spacing.xs,
    borderRadius: 8,
    overflow: "hidden",
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    paddingBottom: Platform.OS === "ios" ? spacing.md : spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    backgroundColor: colors.background,
  },
  attachButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    maxHeight: 120,
    marginHorizontal: 8,
    fontSize: fontSizes.md,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  voiceButton: {
    padding: 8,
  },
  attachmentPicker: {
    backgroundColor: colors.background,
    flexDirection: "row",
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    justifyContent: "space-around",
  },
  attachmentOption: {
    alignItems: "center",
  },
  attachmentIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  attachmentText: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  attachingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  attachingText: {
    color: "white",
    marginTop: spacing.md,
    fontSize: fontSizes.md,
  },
});

export default ChatConversation;
