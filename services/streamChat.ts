import AsyncStorage from "@react-native-async-storage/async-storage";
import {StreamChat} from "stream-chat";
import Config from "../config";

// Create a single instance of the StreamChat client to be reused
let chatClient: StreamChat | null = null;

/**
 * Initialize and get the StreamChat client instance
 * @returns StreamChat client instance
 */
export const getChatClient = () => {
  if (!chatClient) {
    chatClient = StreamChat.getInstance(Config.STREAM_API_KEY, {
      enableInsights: true,
      enableWSFallback: true,
    });
  }
  return chatClient;
};

/**
 * Connect current user to StreamChat
 * @param userId - User ID
 * @param userName - User display name
 * @param imageUrl - User profile image URL
 */
export const connectUser = async (
  userId: string,
  userName: string,
  imageUrl?: string
) => {
  try {
    const client = getChatClient();

    // Get the auth token from AsyncStorage
    const authToken = await AsyncStorage.getItem("appwriteSession");

    // Get token from our Appwrite function
    const result = await fetch(`${Config.API_URL}/api/stream/v2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({userId}),
    });

    if (!result.ok) {
      throw new Error(
        `Server returned ${result.status}: ${await result.text()}`
      );
    }

    const data = await result.json();

    if (!data.success || !data.data?.token) {
      throw new Error(
        "Failed to get StreamChat token: " + (data.message || "Unknown error")
      );
    }

    // Connect user to StreamChat
    await client.connectUser(
      {
        id: userId,
        name: userName,
        image: imageUrl,
      },
      data.data.token
    );

    console.log("Successfully connected to Stream Chat");
    return client;
  } catch (error) {
    console.error("Error connecting to StreamChat:", error);
    throw error;
  }
};

/**
 * Disconnect user from StreamChat
 */
export const disconnectUser = async () => {
  try {
    if (chatClient) {
      await chatClient.disconnectUser();
    }
  } catch (error) {
    console.error("Error disconnecting from StreamChat:", error);
  }
};

/**
 * Create a channel between two users
 * @param currentUserId - The ID of the current user
 * @param otherUserId - The ID of the other user
 * @param otherUserName - The name of the other user
 * @param otherUserImageUrl - The profile image URL of the other user
 */
export const createOneOnOneChannel = async (
  currentUserId: string,
  otherUserId: string,
  otherUserName: string,
  otherUserImageUrl?: string
) => {
  try {
    const client = getChatClient();

    if (!client.userID) {
      throw new Error("User not connected to StreamChat");
    }

    // Create unique channel ID sorted by user IDs to ensure consistency
    const members = [client.userID, otherUserId].sort();
    const channelId = `messaging:${members.join("-")}`;

    // Get or create the channel
    const channel = client.channel("messaging", channelId, {
      members,
      created_by_id: client.userID,
    } as any);

    // Set custom data with type assertion to avoid errors
    channel.data = {
      ...channel.data,
      name: otherUserName,
      image: otherUserImageUrl,
    } as any;

    // Initialize the channel
    await channel.watch();

    return channel;
  } catch (error) {
    console.error("Error creating one-on-one channel:", error);
    throw error;
  }
};

/**
 * Get all channels for the current user
 */
export const getUserChannels = async () => {
  try {
    const client = getChatClient();

    if (!client.userID) {
      throw new Error("User not connected to StreamChat");
    }

    // Use proper typing for the filter
    const filter = {
      type: "messaging",
      members: {$in: [client.userID]} as any, // Type assertion to avoid TS errors
    };

    const sort = {last_message_at: -1} as any; // Type assertion for sort

    const channels = await client.queryChannels(filter, sort, {
      watch: true,
      state: true,
      presence: true,
    });

    return channels;
  } catch (error) {
    console.error("Error getting user channels:", error);
    throw error;
  }
};
