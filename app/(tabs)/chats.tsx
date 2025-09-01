import {colors} from "@/theme";
import React from "react";
import {Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Inbox = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Text>Chats</Text>
    </SafeAreaView>
  );
};

export default Inbox;
