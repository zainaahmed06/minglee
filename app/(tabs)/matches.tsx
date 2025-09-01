import MainHeader from "@/components/MainHeader";
import SwitchButton from "@/components/SwitchButton";
import {colors} from "@/theme";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";

const Matches = () => {
  const tabs = [
    {
      key: "matches",
      title: "Matches",
      count: 85,
    },
    {
      key: "likes",
      title: "Likes",
      count: 24,
    },
  ];

  const handleTabPress = (index: number) => {
    console.log(`Tab ${index} pressed`);
    // You can add your logic here to change content based on selected tab
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <MainHeader />
      <SwitchButton
        tabs={tabs}
        activeColor='#8A4FFF'
        inactiveColor='#F5F5F5'
        onTabPress={handleTabPress}
        initialTabIndex={0}
      />
    </SafeAreaView>
  );
};

export default Matches;
