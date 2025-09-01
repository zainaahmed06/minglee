import MainHeader from "@/components/MainHeader";
import {colors} from "@/theme";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import React from "react";
import Likes from "./likes";
import SuperLikes from "./superLikes";

const Tab = createMaterialTopTabNavigator();

const MatchesLayout = () => {
  return (
    <>
      <MainHeader />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            shadowColor: "white",
            backgroundColor: "red",
          },

          tabBarActiveTintColor: colors.primary, // Text color for active tab
          tabBarInactiveTintColor: colors.text, // Text color for inactive tab
        }}>
        <Tab.Screen name='Likes' component={Likes} options={{}} />
        <Tab.Screen name='Super Likes' component={SuperLikes} />
      </Tab.Navigator>
    </>
  );
};

export default MatchesLayout;
