import EmailNotifications from "@/components/EmailNotifications";
import NotificationsList from "@/components/NotificationsList";
import SwitchButton from "@/components/SwitchButton";
import {colors} from "@/theme";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";

const Matches = () => {
  const [isPushActive, setIsPushNotifications] = useState(true);
  const tabs = [
    {
      key: "pushNotifications",
      title: "Push Notifications",
      count: 85,
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      count: 24,
    },
  ];

  const handleTabPress = (index: number) => {
    if (index === 0) {
      setIsPushNotifications(true);
    } else {
      setIsPushNotifications(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <SwitchButton
        tabs={tabs}
        activeColor={colors.primary}
        inactiveColor={colors.surfaceSecondary}
        onTabPress={handleTabPress}
        initialTabIndex={0}
      />
      {isPushActive ? <NotificationsList /> : <EmailNotifications />}
    </SafeAreaView>
  );
};

export default Matches;
