import ActiveUsers from "@/components/ActiveUsers";
import ChatList from "@/components/ChatList";
import MainHeader from "@/components/MainHeader";
import React from "react";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Chats = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />
      <ActiveUsers />
      <ChatList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Chats;
