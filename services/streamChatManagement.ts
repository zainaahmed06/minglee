import Config from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Channel as StreamChannel} from "stream-chat";
import {getChatClient} from "./streamChat";

/**
 * Channel management functions that use the Appwrite Stream Chat function
 */

/**
 * Create a new chat channel
 * @param channelType - Type of channel (e.g., "messaging")
 * @param channelId - Unique ID for the channel (can be undefined for auto-generated IDs)
 * @param members - Array of user IDs to add to the channel
 * @param name - Channel name
 * @param data - Additional channel data
 */
export const createChannel = async (
  channelType: string,
  channelId: string | undefined,
  members: string[],
  name: string,
  data?: Record<string, any>
): Promise<StreamChannel> => {
  try {
    // Get client to access locally
    const client = getChatClient();
    if (!client.userID) {
      throw new Error("User not connected to StreamChat");
    }

    // First try to create channel using Stream's client-side SDK
    const channel = client.channel(channelType, channelId, {
      name,
      members,
      created_by_id: client.userID,
      ...data,
    } as any);

    // Initialize the channel
    await channel.watch();

    // Also create/update the channel on our backend for enhanced capabilities
    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/channel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        channelType,
        channelId: channel.id,
        members,
        name,
        creatorId: client.userID,
        data,
      }),
    });

    return channel;
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error;
  }
};

/**
 * Add members to a channel
 * @param channel - The Stream channel object
 * @param memberIds - Array of user IDs to add
 */
export const addChannelMembers = async (
  channel: StreamChannel,
  memberIds: string[]
): Promise<void> => {
  try {
    // Add members using Stream's client-side SDK
    await channel.addMembers(memberIds);

    // Also update members on our backend
    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/channel/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        channelType: channel.type,
        channelId: channel.id,
        members: memberIds,
      }),
    });
  } catch (error) {
    console.error("Error adding channel members:", error);
    throw error;
  }
};

/**
 * Remove members from a channel
 * @param channel - The Stream channel object
 * @param memberIds - Array of user IDs to remove
 */
export const removeChannelMembers = async (
  channel: StreamChannel,
  memberIds: string[]
): Promise<void> => {
  try {
    // Remove members using Stream's client-side SDK
    await channel.removeMembers(memberIds);

    // Also update members on our backend
    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/channel/members`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        channelType: channel.type,
        channelId: channel.id,
        members: memberIds,
      }),
    });
  } catch (error) {
    console.error("Error removing channel members:", error);
    throw error;
  }
};

/**
 * Update a channel's data
 * @param channel - The Stream channel object
 * @param data - New channel data to set
 */
export const updateChannel = async (
  channel: StreamChannel,
  data: Record<string, any>
): Promise<void> => {
  try {
    // Update channel using Stream's client-side SDK
    await channel.update(data);

    // Also update on our backend
    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/channel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        channelType: channel.type,
        channelId: channel.id,
        data,
      }),
    });
  } catch (error) {
    console.error("Error updating channel:", error);
    throw error;
  }
};

/**
 * Delete a channel
 * @param channel - The Stream channel object
 */
export const deleteChannel = async (channel: StreamChannel): Promise<void> => {
  try {
    // Delete channel using Stream's client-side SDK
    await channel.delete();

    // Also delete on our backend
    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/channel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        channelType: channel.type,
        channelId: channel.id,
      }),
    });
  } catch (error) {
    console.error("Error deleting channel:", error);
    throw error;
  }
};

/**
 * Ban a user from a channel
 * @param userId - ID of the user to ban
 * @param channelType - Channel type
 * @param channelId - Channel ID
 * @param reason - Reason for the ban
 * @param timeout - Ban duration in seconds (optional)
 */
export const banUser = async (
  userId: string,
  channelType: string,
  channelId: string,
  reason?: string,
  timeout?: number
): Promise<void> => {
  try {
    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/ban`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        targetUserId: userId,
        channelType,
        channelId,
        reason,
        timeout,
      }),
    });
  } catch (error) {
    console.error("Error banning user:", error);
    throw error;
  }
};

/**
 * Unban a user from a channel
 * @param userId - ID of the user to unban
 * @param channelType - Channel type
 * @param channelId - Channel ID
 */
export const unbanUser = async (
  userId: string,
  channelType: string,
  channelId: string
): Promise<void> => {
  try {
    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/ban`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        targetUserId: userId,
        channelType,
        channelId,
      }),
    });
  } catch (error) {
    console.error("Error unbanning user:", error);
    throw error;
  }
};

/**
 * Flag a message for moderation
 * @param messageId - ID of the message to flag
 */
export const flagMessage = async (messageId: string): Promise<void> => {
  try {
    const client = getChatClient();
    if (!client.userID) {
      throw new Error("User not connected to StreamChat");
    }

    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/flag/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        messageId,
        userId: client.userID,
      }),
    });
  } catch (error) {
    console.error("Error flagging message:", error);
    throw error;
  }
};

/**
 * Flag a user for moderation
 * @param targetUserId - ID of the user to flag
 */
export const flagUser = async (targetUserId: string): Promise<void> => {
  try {
    const client = getChatClient();
    if (!client.userID) {
      throw new Error("User not connected to StreamChat");
    }

    const authToken = await AsyncStorage.getItem("appwriteSession");

    await fetch(`${Config.API_URL}/api/stream/v2/flag/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken || ""}`,
      },
      body: JSON.stringify({
        targetUserId,
        userId: client.userID,
      }),
    });
  } catch (error) {
    console.error("Error flagging user:", error);
    throw error;
  }
};
