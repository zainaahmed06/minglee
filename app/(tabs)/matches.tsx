import {colors} from "@/theme";
import React from "react";
import {Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Matches = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Text>Matches</Text>
    </SafeAreaView>
  );
};

export default Matches;
