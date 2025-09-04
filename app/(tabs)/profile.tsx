import Header from "@/components/Header";
import {colors, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import React from "react";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title='Profile'
        leftIcon={<Ionicons name='arrow-back' size={24} color={colors.text} />}
        rightIcon={
          <Ionicons name='settings-outline' size={24} color={colors.text} />
        }
        onRightPress={() => router.push("/(single)/settings")}
      />
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
