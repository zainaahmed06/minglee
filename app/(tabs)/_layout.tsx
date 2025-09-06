import {Chats, Explore, Home, Matches, Profile} from "@/constants/TabsIcons";
import {useAuth} from "@/store/useAuth";
import {colors} from "@/theme";
import {Tabs, useRouter, useSegments} from "expo-router";
import React, {useEffect} from "react";

const TabsLayout = () => {
  const {isAuthenticated, isInitialized, otpVerified} = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isInitialized) return;

    const inTabsGroup = segments[0] === "(tabs)";

    // If user is in tabs group but not fully authenticated and verified, redirect to auth
    if (inTabsGroup && (!isAuthenticated || !otpVerified)) {
      console.log("User not fully authenticated - redirecting to auth");
      router.replace("/(auth)/signin");
    }
  }, [isInitialized, isAuthenticated, otpVerified, segments, router]);
  return (
    <Tabs
      screenOptions={{
        // tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          shadowOpacity: 0,
          shadowColor: "white",
          borderTopWidth: 0,
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
          tabBarBadge: 5,
          tabBarBadgeStyle: {
            backgroundColor: colors.textSecondary,
          },
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
