import MainHeader from "@/components/MainHeader";
import {ProfileSwiper} from "@/components/ProfileSwiper";
import {colors} from "@/theme";
import React from "react";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />
      <View style={styles.swiperContainer}>
        <ProfileSwiper />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  swiperContainer: {
    flex: 1,
    marginTop: -10, // Reduce space between header and swiper
  },
});

export default Home;
