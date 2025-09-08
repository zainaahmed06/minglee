import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

interface SwitchButtonProps {
  tabs: {
    key: string;
    title: string;
    count?: number;
  }[];
  activeColor?: string;
  inactiveColor?: string;
  onTabPress?: (index: number) => void;
  initialTabIndex?: number;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  tabs,
  activeColor = "#8A4FFF",
  inactiveColor = "#F5F5F5",
  onTabPress,
  initialTabIndex = 0,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);

  const handleTabPress = (index: number) => {
    setActiveTabIndex(index);
    if (onTabPress) {
      onTabPress(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          const isActive = activeTabIndex === index;
          return (
            <Pressable
              key={tab.key}
              style={[
                styles.tab,
                isActive
                  ? [styles.activeTab, {backgroundColor: activeColor}]
                  : styles.inactiveTab,
              ]}
              onPress={() => handleTabPress(index)}>
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.activeTabText : styles.inactiveTabText,
                ]}>
                {tab.title}
                {tab.count !== undefined && ` (${tab.count})`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    padding: 4,
    height: 56,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#8A4FFF", // Default purple color
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "UrbanistRegular",
    textAlign: "center",
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "#333333",
  },
});

export default SwitchButton;
