import Button from "@/components/Button";
import MainHeader from "@/components/MainHeader";
import {spacing} from "@/theme";
import {router} from "expo-router";
import React from "react";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />
      <Button
        onPress={() => router.push("/(single)/settings")}
        variant='solid'
        color='primary'>
        Go to Account & Security
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: spacing.md,
  },
});

export default Profile;
