import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {Channel as StreamChannel, StreamChat} from "stream-chat";
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  Thread,
} from "stream-chat-expo";
import {ChatProvider} from "./useChatContext";

import Config from "@/config";

// Create a custom wrapper to provide all Stream Chat components
export const StreamChatWrapper: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  // Initialize the Stream Chat client
  const chatClient = StreamChat.getInstance(Config.STREAM_API_KEY);

  return (
    <ChatProvider>
      <Chat client={chatClient}>
        <OverlayProvider>{children}</OverlayProvider>
      </Chat>
    </ChatProvider>
  );
};

// Export Stream Chat components
export {Channel, ChannelList, Chat, MessageInput, MessageList, Thread};

// Export Stream Chat client type
export type {StreamChannel, StreamChat};

// Export FileSystem and ImagePicker for handling media attachments
export {FileSystem, ImagePicker};
