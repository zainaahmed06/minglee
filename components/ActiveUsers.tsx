import {colors, spacing} from "@/theme";
import {useRouter} from "expo-router";
import React from "react";
import {FlatList, Image, Pressable, StyleSheet, Text, View} from "react-native";

// Define the user type
interface User {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
}

// Sample data - replace with your actual data
const activeUsers: User[] = [
  {
    id: "1",
    name: "Emma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    isActive: true,
  },
  {
    id: "2",
    name: "Sophia",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    isActive: true,
  },
  {
    id: "3",
    name: "Olivia",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    isActive: true,
  },
  {
    id: "4",
    name: "Isabella",
    avatar: "https://randomuser.me/api/portraits/women/49.jpg",
    isActive: true,
  },
  {
    id: "5",
    name: "Ava",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    isActive: true,
  },
];

interface ChatActiveProps {
  users?: User[];
  onSeeAll?: () => void;
  onUserPress?: (user: User) => void;
}

const ChatActive = ({
  users = activeUsers,
  onSeeAll,
  onUserPress,
}: ChatActiveProps) => {
  const router = useRouter();

  const handleSeeAll = () => {
    if (onSeeAll) {
      onSeeAll();
    } else {
      // Default navigation if no callback provided
      router.push("/activeUsers");
    }
  };

  const renderUserItem = ({item}: {item: User}) => (
    <Pressable style={styles.userItem} onPress={() => onUserPress?.(item)}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        {item.isActive && <View style={styles.activeIndicator} />}
      </View>
      <Text style={styles.userName} numberOfLines={1}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.md,
  },
  userItem: {
    alignItems: "center",
    marginRight: spacing.lg,
    width: 70,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: spacing.xs,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: colors.backgroundSecondary,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#8A4FFF", // Purple active indicator as shown in image
    borderWidth: 2,
    borderColor: colors.background,
  },
  userName: {
    fontSize: 12,
    color: colors.text,
    textAlign: "center",
    maxWidth: 70,
  },
});

export default ChatActive;
