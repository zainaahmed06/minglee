import SwitchButton from "@/components/SwitchButton";
import React from "react";
import {StyleSheet, View} from "react-native";

const SwitchButtonExample = () => {
  const tabs = [
    {
      key: "likes",
      title: "Likes",
      count: 85,
    },
    {
      key: "superlikes",
      title: "Super Likes",
      count: 24,
    },
  ];

  const handleTabPress = (index: number) => {
    console.log(`Tab ${index} pressed`);
    // You can add your logic here to change content based on selected tab
  };

  return (
    <View style={styles.container}>
      <SwitchButton
        tabs={tabs}
        activeColor='#8A4FFF'
        inactiveColor='#F5F5F5'
        onTabPress={handleTabPress}
        initialTabIndex={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
});

export default SwitchButtonExample;
