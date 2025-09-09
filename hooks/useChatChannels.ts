import {getChatClient} from "@/services/streamChat";
import {
  addChannelMembers,
  createChannel,
  deleteChannel,
  removeChannelMembers,
} from "@/services/streamChatManagement";
import {useAuth} from "@/store/useAuth";
import {useCallback, useEffect, useState} from "react";
import {Channel} from "stream-chat";

/**
 * Custom hook for managing chat channels
 */
export function useChatChannels() {
  const {user} = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Load all channels for the current user
   */
  const loadChannels = useCallback(async () => {
    if (!user?.$id) return;

    setLoading(true);
    setError(null);

    try {
      const client = getChatClient();

      if (!client.userID) {
        throw new Error("User not connected to StreamChat");
      }

      // Use proper typing for the filter
      const filter = {
        type: "messaging",
        members: {$in: [client.userID]} as any,
      };

      const sort = {last_message_at: -1} as any;

      const channelList = await client.queryChannels(filter, sort, {
        watch: true,
        state: true,
        presence: true,
      });

      setChannels(channelList);
    } catch (err) {
      console.error("Error loading channels:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to load channels")
      );
    } finally {
      setLoading(false);
    }
  }, [user?.$id]);

  /**
   * Create a new chat channel
   */
  const createNewChannel = useCallback(
    async (
      channelType: string,
      members: string[],
      name: string,
      data?: Record<string, any>
    ) => {
      if (!user?.$id) {
        throw new Error("User not authenticated");
      }

      setLoading(true);
      setError(null);

      try {
        // Include current user in members if not already included
        if (!members.includes(user.$id)) {
          members.push(user.$id);
        }

        const channel = await createChannel(
          channelType,
          undefined, // Let Stream generate a unique ID
          members,
          name,
          data
        );

        // Add to local state
        setChannels((prev) => [...prev, channel]);

        return channel;
      } catch (err) {
        console.error("Error creating channel:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to create channel")
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.$id]
  );

  /**
   * Delete a chat channel
   */
  const removeChannel = useCallback(
    async (channel: Channel) => {
      if (!user?.$id) return;

      setLoading(true);
      setError(null);

      try {
        await deleteChannel(channel);

        // Remove from local state
        setChannels((prev) => prev.filter((c) => c.id !== channel.id));

        // Clear active channel if it's the deleted one
        if (activeChannel?.id === channel.id) {
          setActiveChannel(null);
        }
      } catch (err) {
        console.error("Error deleting channel:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to delete channel")
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.$id, activeChannel]
  );

  /**
   * Add members to a channel
   */
  const addMembers = useCallback(
    async (channel: Channel, memberIds: string[]) => {
      if (!user?.$id) return;

      setLoading(true);
      setError(null);

      try {
        await addChannelMembers(channel, memberIds);

        // Refresh the channel to get updated member list
        await channel.watch();

        // Update local state
        setChannels((prev) =>
          prev.map((c) => (c.id === channel.id ? channel : c))
        );
      } catch (err) {
        console.error("Error adding members:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to add members")
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.$id]
  );

  /**
   * Remove members from a channel
   */
  const removeMembers = useCallback(
    async (channel: Channel, memberIds: string[]) => {
      if (!user?.$id) return;

      setLoading(true);
      setError(null);

      try {
        await removeChannelMembers(channel, memberIds);

        // Refresh the channel to get updated member list
        await channel.watch();

        // Update local state
        setChannels((prev) =>
          prev.map((c) => (c.id === channel.id ? channel : c))
        );
      } catch (err) {
        console.error("Error removing members:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to remove members")
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.$id]
  );

  /**
   * Set the active channel
   */
  const setCurrentChannel = useCallback((channel: Channel | null) => {
    setActiveChannel(channel);
  }, []);

  // Load channels on mount or when user changes
  useEffect(() => {
    if (user?.$id) {
      loadChannels();
    } else {
      setChannels([]);
      setActiveChannel(null);
    }
  }, [user?.$id, loadChannels]);

  return {
    channels,
    activeChannel,
    loading,
    error,
    loadChannels,
    createNewChannel,
    removeChannel,
    addMembers,
    removeMembers,
    setCurrentChannel,
  };
}
