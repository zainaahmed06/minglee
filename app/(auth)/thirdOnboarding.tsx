import Button from "@/components/Button";
import {colors, fontSizes, spacing} from "@/theme";
import {useRouter} from "expo-router";
import React from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";

const ThirdOnboarding = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/(auth)/welcome"); // Navigate to the next onboarding screen
  };

  return (
    <ImageBackground
      src='https://fra.cloud.appwrite.io/v1/storage/buckets/assets/files/thirdOnboarding/view?project=68b537520017ae952ec0&mode=admin'
      style={styles.container}
      resizeMode='contain'>
      {/* Bottom curved white section */}
      <View style={styles.bottomSection}>
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Discover Meaningful Connections</Text>

          <Text style={styles.description}>
            Join Datify today and explore a world of meaningful connections.
            Swipe, match, and meet like-minded people.
          </Text>

          {/* Pagination indicators */}
          <View style={styles.paginationContainer}>
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
            <View style={[styles.paginationDot, styles.activeDot]} />
          </View>
        </View>

        {/* Button container */}
        <View style={styles.buttonContainer}>
          <Button
            variant='solid'
            color='primary'
            radius='full'
            onPress={handleContinue}
            style={styles.continueButton}>
            Continue
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
  },
  topSection: {
    height: 400,
    width: "100%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    height: 400,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.md,
    justifyContent: "space-between",
  },

  content: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontFamily: "UrbanistBold",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: fontSizes.md * 1.5,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xl,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textTertiary,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xxxl,
  },
  skipButton: {
    flex: 1,
    marginRight: spacing.md,
  },
  continueButton: {
    flex: 2,
  },
});

export default ThirdOnboarding;
