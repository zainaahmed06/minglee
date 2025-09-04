import LikedList from "@/components/LikedList";
import MainHeader from "@/components/MainHeader";
import MatchesList from "@/components/MatchesList";
import SwitchButton from "@/components/SwitchButton";
import {colors} from "@/theme";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";

const Matches = () => {
  const [isMatchActive, setIsMatchActive] = useState(true);
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
    if (index === 0) {
      setIsMatchActive(true);
    } else {
      setIsMatchActive(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <MainHeader />
      <SwitchButton
        tabs={tabs}
        activeColor={colors.primary}
        inactiveColor={colors.surfaceSecondary}
        onTabPress={handleTabPress}
        initialTabIndex={0}
      />
      {isMatchActive ? <MatchesList /> : <LikedList />}
    </SafeAreaView>
  );
};

export default Matches;
