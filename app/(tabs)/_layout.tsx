import {Chats, Explore, Home, Matches, Profile} from "@/constants/TabsIcons";
import {colors} from "@/theme";
import {Tabs} from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        // tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          shadowOpacity: 0,
          shadowColor: "white",
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name='home'
        options={{
          title: "Home",
          tabBarIcon: ({color, focused, size}) => (
            <Home
              color={focused ? colors.background : colors.text}
              brandColor={focused ? color : colors.textTertiary}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: "Explore",
          tabBarIcon: ({color, focused, size}) => (
            <Explore
              color={focused ? colors.background : colors.text}
              brandColor={focused ? color : colors.textTertiary}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='matches'
        options={{
          title: "Matches",
          tabBarIcon: ({color, focused, size}) => (
            <Matches
              color={focused ? colors.background : colors.text}
              brandColor={focused ? color : colors.textTertiary}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='chats'
        options={{
          title: "Chats",
          tabBarIcon: ({color, focused, size}) => (
            <Chats
              color={focused ? colors.background : colors.text}
              brandColor={focused ? color : colors.textTertiary}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarIcon: ({color, focused, size}) => (
            <Profile
              color={focused ? colors.background : colors.text}
              brandColor={focused ? color : colors.textTertiary}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
