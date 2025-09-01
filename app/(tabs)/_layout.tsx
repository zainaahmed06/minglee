import {Tabs} from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='chats' />
      <Tabs.Screen name='explore' />
      <Tabs.Screen name='matches' />
      <Tabs.Screen name='chat' />
      <Tabs.Screen name='profile' />
    </Tabs>
  );
};

export default TabsLayout;
