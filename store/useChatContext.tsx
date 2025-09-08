import {connectUser, disconnectUser} from "@/services/streamChat";
import {useAuth} from "@/store/useAuth";
import {useMatchedProfiles} from "@/store/useMatchedProfiles";
import {getDisplayName} from "@/utils/chatHelpers";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {ChannelSort, Channel as StreamChannel, StreamChat} from "stream-chat";

// Define the shape of our chat context
interface ChatContextType {
  client: StreamChat | null;
  isConnecting: boolean;
  isConnected: boolean;
  channels: StreamChannel[];
  activeChannel: StreamChannel | null;
  error: Error | null;
  refreshChannels: () => Promise<void>;
  setActiveChannel: (channel: StreamChannel | null) => void;
  getOrCreateChannel: (
    otherUserId: string,
    otherUserName: string,
    otherUserImage?: string
  ) => Promise<StreamChannel>;
}

// Create the context
const ChatContext = createContext<ChatContextType | null>(null);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
  const {user, isAuthenticated} = useAuth();
  const {matchedProfiles} = useMatchedProfiles();

  const [client, setClient] = useState<StreamChat | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [channels, setChannels] = useState<StreamChannel[]>([]);
  const [activeChannel, setActiveChannel] = useState<StreamChannel | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  // Connect user to StreamChat when authenticated
  useEffect(() => {
    let mounted = true;

    const connectToStream = async () => {
      if (!user || !isAuthenticated) return;

      setIsConnecting(true);
      setError(null);

      try {
        // Get display name and profile image
        const userName = getDisplayName(user);
        const userImage = user.prefs?.profileImageUrl || "";

        // Connect to Stream Chat
        const chatClient = await connectUser(user.$id, userName, userImage);

        if (mounted) {
          setClient(chatClient);
          setIsConnected(true);

          // Load initial channels
          await refreshChannels();
        }
      } catch (err) {
        console.error("Error connecting to StreamChat:", err);
        if (mounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to connect to chat")
          );
        }
      } finally {
        if (mounted) {
          setIsConnecting(false);
        }
      }
    };

    connectToStream();

    // Cleanup on unmount or when auth state changes
    return () => {
      mounted = false;
      disconnectUser().catch(console.error);
    };
  }, [user, isAuthenticated]);

  // Refresh user channels
  const refreshChannels = async () => {
    if (!isConnected || !client) return;

    try {
      const filter = {
        type: "messaging",
        members: {$in: [client.userID]} as any,
      };

      const sort: ChannelSort = {last_message_at: -1} as any;

      const userChannels = await client.queryChannels(filter, sort, {
        watch: true,
        state: true,
        presence: true,
      });

      setChannels(userChannels);
    } catch (err) {
      console.error("Error fetching channels:", err);
      setError(err instanceof Error ? err : new Error("Failed to load chats"));
    }
  };

  // Get or create a one-to-one channel with another user
  const getOrCreateChannel = async (
    otherUserId: string,
    otherUserName: string,
    otherUserImage?: string
  ): Promise<StreamChannel> => {
    if (!client || !client.userID) {
      throw new Error("Chat client not connected");
    }

    try {
      // Create unique channel ID sorted by user IDs to ensure consistency
      const members = [client.userID, otherUserId].sort();
      const channelId = `messaging:${members.join("-")}`;

      // Check if we already have this channel loaded
      const existingChannel = channels.find((c) => c.id === channelId);
      if (existingChannel) {
        return existingChannel;
      }

      // Create the channel if it doesn't exist
      const channel = client.channel("messaging", channelId, {
        members,
        created_by_id: client.userID,
      } as any);

      // Set custom data with type assertion to avoid errors
      channel.data = {
        ...channel.data,
        name: otherUserName,
        image: otherUserImage,
      } as any;

      // Initialize the channel and add it to our list
      await channel.watch();
      setChannels((prev) => [channel, ...prev]);

      return channel;
    } catch (err) {
      console.error("Error creating channel:", err);
      throw err;
    }
  };

  return (
    <ChatContext.Provider
      value={{
        client,
        isConnecting,
        isConnected,
        channels,
        activeChannel,
        error,
        refreshChannels,
        setActiveChannel,
        getOrCreateChannel,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
