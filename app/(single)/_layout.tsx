import {Stack} from "expo-router";
import React from "react";

const SingleLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='notifications' />
      <Stack.Screen name='activeUsers' />
      <Stack.Screen name='userProfile' />
    </Stack>
  );
};

export default SingleLayout;
