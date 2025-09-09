import Button from "@/components/Button";
import {useChatChannels} from "@/hooks/useChatChannels";
import {useAuth} from "@/store/useAuth";
import React, {useState} from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {Channel} from "stream-chat";

/**
 * Chat management component
 * Demonstrates how to create, update, and manage channels using Stream Chat
 */
export default function ChatManagement() {
  const {user} = useAuth();
  const {
    channels,
    activeChannel,
    loading,
    createNewChannel,
    removeChannel,
    addMembers,
    removeMembers,
    setCurrentChannel,
  } = useChatChannels();

  const [newChannelName, setNewChannelName] = useState("");
  const [newMemberId, setNewMemberId] = useState("");

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          You need to be logged in to access chat
        </Text>
      </View>
    );
  }

  /**
   * Create a new channel
   */
  const handleCreateChannel = async () => {
    if (!newChannelName.trim()) {
      Alert.alert("Error", "Please enter a channel name");
      return;
    }

    try {
      await createNewChannel("messaging", [user.$id], newChannelName);
      setNewChannelName("");
      Alert.alert("Success", "Channel created successfully");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to create channel"
      );
    }
  };

  /**
   * Delete the active channel
   */
  const handleDeleteChannel = async () => {
    if (!activeChannel) {
      Alert.alert("Error", "No active channel selected");
      return;
    }

    try {
      await removeChannel(activeChannel);
      Alert.alert("Success", "Channel deleted successfully");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to delete channel"
      );
    }
  };

  /**
   * Add a member to the active channel
   */
  const handleAddMember = async () => {
    if (!activeChannel) {
      Alert.alert("Error", "No active channel selected");
      return;
    }

    if (!newMemberId.trim()) {
      Alert.alert("Error", "Please enter a member ID");
      return;
    }

    try {
      await addMembers(activeChannel, [newMemberId]);
      setNewMemberId("");
      Alert.alert("Success", "Member added successfully");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to add member"
      );
    }
  };

  /**
   * Remove a member from the active channel
   */
  const handleRemoveMember = async (memberId: string) => {
    if (!activeChannel) {
      Alert.alert("Error", "No active channel selected");
      return;
    }

    try {
      await removeMembers(activeChannel, [memberId]);
      Alert.alert("Success", "Member removed successfully");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to remove member"
      );
    }
  };

  /**
   * Select a channel as active
   */
  const handleSelectChannel = (channel: Channel) => {
    setCurrentChannel(channel);
  };

  // Get members of the active channel
  const activeChannelMembers = activeChannel?.state?.members
    ? Object.values(activeChannel.state.members).map((m) => m.user?.id || "")
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Management</Text>

      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {/* Create Channel Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create New Channel</Text>
        <TextInput
          style={styles.input}
          placeholder='Channel Name'
          value={newChannelName}
          onChangeText={setNewChannelName}
        />
        <Button onPress={handleCreateChannel}>Create Channel</Button>
      </View>

      {/* Channel List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Channels</Text>
        <ScrollView style={styles.channelList}>
          {channels.length === 0 ? (
            <Text style={styles.emptyText}>No channels found</Text>
          ) : (
            channels.map((channel) => (
              <TouchableOpacity
                key={channel.id}
                style={[
                  styles.channelItem,
                  activeChannel?.id === channel.id && styles.activeChannelItem,
                ]}
                onPress={() => handleSelectChannel(channel)}>
                <Text style={styles.channelName}>
                  {(channel.data as any)?.name || `Channel ${channel.id}`}
                </Text>
                <Text style={styles.channelMembers}>
                  {Object.keys(channel.state?.members || {}).length} members
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      {/* Active Channel Details */}
      {activeChannel && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Channel Details</Text>
          <Text style={styles.channelDetailName}>
            {(activeChannel.data as any)?.name || `Channel ${activeChannel.id}`}
          </Text>

          {/* Add Member Form */}
          <View style={styles.memberForm}>
            <TextInput
              style={styles.memberInput}
              placeholder='Member ID'
              value={newMemberId}
              onChangeText={setNewMemberId}
            />
            <Button onPress={handleAddMember}>Add</Button>
          </View>

          {/* Member List */}
          <Text style={styles.membersTitle}>Members:</Text>
          <FlatList
            data={activeChannelMembers}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <View style={styles.memberItem}>
                <Text style={styles.memberId}>{item}</Text>
                {item !== user.$id && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveMember(item)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No members</Text>
            }
          />

          {/* Delete Channel */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteChannel}>
            <Text style={styles.deleteButtonText}>Delete Channel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  channelList: {
    maxHeight: 200,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  channelItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activeChannelItem: {
    backgroundColor: "#f0f8ff",
  },
  channelName: {
    fontSize: 16,
    fontWeight: "500",
  },
  channelMembers: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  channelDetailName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
  },
  memberForm: {
    flexDirection: "row",
    marginBottom: 16,
  },
  memberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
  },
  membersTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  memberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  memberId: {
    fontSize: 14,
  },
  removeButton: {
    padding: 6,
    backgroundColor: "#ffebee",
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#d32f2f",
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
