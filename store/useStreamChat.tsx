import {Audio} from "expo-av";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as Video from "expo-video";
import {Channel as StreamChannel, StreamChat} from "stream-chat";
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  ThemeProvider,
  Thread,
} from "stream-chat-expo";
import {ChatProvider} from "./useChatContext";

import Config from "@/config";
import {colors} from "@/theme";

// Create a custom wrapper to provide all Stream Chat components
export const StreamChatWrapper: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  // Initialize the Stream Chat client
  const chatClient = StreamChat.getInstance(Config.STREAM_API_KEY);

  // Define our custom theme using app colors
  const streamTheme = {
    colors: {
      accent_blue: colors.primary,
      accent_green: colors.success,
      accent_red: colors.danger,
      bg_gradient_end: colors.background,
      bg_gradient_start: colors.background,
      black: colors.text,
      border: colors.border,
      grey: colors.textSecondary,
      grey_whisper: colors.surfaceSecondary,
      overlay: `${colors.text}CC`, // CC = 80% opacity
      white: colors.background,
    },
  };

  return (
    <ChatProvider>
      <ThemeProvider style={streamTheme}>
        <OverlayProvider>
          <Chat client={chatClient}>{children}</Chat>
        </OverlayProvider>
      </ThemeProvider>
    </ChatProvider>
  );
};

// Export Stream Chat components
export {Channel, ChannelList, Chat, MessageInput, MessageList, Thread};

// Export Stream Chat client type
export type {StreamChannel, StreamChat};

// Export FileSystem and media-related packages for handling attachments
export {
  Audio,
  Clipboard,
  DocumentPicker,
  FileSystem,
  ImagePicker,
  MediaLibrary,
  Sharing,
  Video,
};
