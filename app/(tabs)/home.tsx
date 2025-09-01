import {colors} from "@/theme";
import React from "react";
import {Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
