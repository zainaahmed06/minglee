import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {BirthDay} from "@/constants/MingleeIcons";
import {colors, radius, spacing} from "@/theme";
import Slider from "@react-native-community/slider";
import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {ProgressStep, ProgressSteps} from "react-native-progress-steps";
import {SafeAreaView} from "react-native-safe-area-context";

const AccountSetup = () => {
  const [username, setUsername] = useState("");
  const [distance, setDistance] = useState(80); // Default value for the slider

  // Function to format distance value
  const formatDistance = (value: any) => {
    return `${Math.round(value)} km`;
  };

  const mainGoals = [
    {
      id: "dating",
      title: "Dating 👩‍❤️‍👨",
      description:
        "Seeking love and meaningful connections? Choose dating for genuine relationships.",
    },
    {
      id: "friendship",
      title: "Friendship 🙌",
      description:
        "Seeking love and meaningful connections? Choose dating for genuine relationships.",
    },
    {
      id: "casual",
      title: "Casual 😄",
      description:
        "Looking for fun and relaxed encounters? Select casual for carefree connections.",
    },
    {
      id: "serious",
      title: "Serious Relationship 💍",
      description:
        "Ready for commitment and a lasting partnership? Pick serious relationship.",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ProgressSteps
        topOffset={38}
        marginBottom={4}
        progressBarColor={colors.textTertiary}
        activeStepIconColor={colors.textTertiary}
        activeStepIconBorderColor={colors.textSecondary}
        disabledStepIconColor={colors.textTertiary}
        activeStepNumColor={colors.background}
        completedProgressBarColor={colors.primary}
        completedStepIconColor={colors.primary}>
        {/* Your datify identity  */}
        <ProgressStep
          buttonNextText='Continue'
          buttonFillColor={colors.primary}
          buttonPreviousText='Back'
          buttonBorderColor={colors.primary}>
          <View>
            <Text style={[styles.heading, {color: colors.text}]}>
              Your datify identity 😎
            </Text>
            <Text style={[styles.subHeading, {color: colors.textTertiary}]}>
              Create a unique nickname that represents you. It is how others
              will know and remember you.
            </Text>
            <Input
              placeholder='Nickname '
              variant='flat'
              radius='lg'
              value={username}
              onValueChange={setUsername}
            />
          </View>
        </ProgressStep>
        {/* Let's celebrate you */}
        <ProgressStep
          buttonNextText='Continue'
          buttonFillColor={colors.primary}
          buttonPreviousText='Back'
          buttonBorderColor={colors.primary}>
          <Text style={[styles.heading, {color: colors.text}]}>
            Let{"'"}s celebrate you 🎂
          </Text>
          <Text style={[styles.subHeading, {color: colors.textTertiary}]}>
            Tell us your birthdate. Your profile does not display your
            birthdate, only your age.
          </Text>

          <View
            style={{
              paddingTop: spacing.lg,
              alignItems: "center",
              gap: spacing.lg,
            }}>
            <BirthDay />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: spacing.lg,
              }}>
              <TextInput
                style={{
                  width: "25%",
                  alignItems: "center",
                  padding: spacing.lg,
                  backgroundColor: colors.surfaceSecondary,
                  borderRadius: radius.md,
                  borderWidth: 1,
                  borderColor: colors.surface,
                }}
                placeholder='MM'
              />
              <TextInput
                style={{
                  width: "25%",
                  justifyContent: "center",
                  padding: spacing.md,
                  backgroundColor: colors.surfaceSecondary,
                  borderRadius: radius.md,
                  borderWidth: 1,
                  borderColor: colors.surface,
                }}
                placeholder='DD'
              />
              <TextInput
                style={{
                  width: "25%",
                  alignItems: "center",
                  padding: spacing.md,
                  backgroundColor: colors.surfaceSecondary,
                  borderRadius: radius.md,
                  borderWidth: 1,
                  borderColor: colors.surface,
                }}
                placeholder='YYYY'
              />
            </View>
          </View>
        </ProgressStep>
        {/* Be true to yourself */}
        <ProgressStep
          buttonNextText='Continue'
          buttonFillColor={colors.primary}
          buttonPreviousText='Back'
          buttonBorderColor={colors.primary}>
          <Text style={[styles.heading, {color: colors.text}]}>
            Be true to yourself 🌟
          </Text>
          <Text style={[styles.subHeading, {color: colors.textTertiary}]}>
            Choose the gender that best represents you. Authenticity is key to
            meaningful connections.
          </Text>
          <View style={{flexDirection: "column", gap: spacing.md}}>
            <Button variant='faded' color='primary'>
              Man
            </Button>
            <Button variant='faded' color='primary'>
              Women
            </Button>
            <Button variant='solid' color='primary'>
              Other
            </Button>
          </View>
        </ProgressStep>
        {/* Find matches nearby */}
        <ProgressStep
          buttonNextText='Continue'
          buttonFillColor={colors.primary}
          buttonPreviousText='Back'
          buttonBorderColor={colors.primary}>
          <Text style={[styles.heading, {color: colors.text}]}>
            Find matches nearby📍
          </Text>
          <Text style={[styles.subHeading, {color: colors.textTertiary}]}>
            Select your preferred distance range to discover matches
            conveniently. We will help you find love close by.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 16,
                color: colors.text,
              }}>
              Distance Preference
            </Text>
            <Text
              style={{fontSize: 18, fontWeight: "bold", color: colors.text}}>
              {formatDistance(distance)}
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={200}
              value={distance}
              onValueChange={setDistance}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.textTertiary}
              thumbTintColor={colors.primary}
              step={1}
            />
          </View>
        </ProgressStep>
        {/* Show your best self */}
        <ProgressStep
          buttonNextText='Continue'
          buttonFillColor={colors.primary}
          buttonPreviousText='Back'
          buttonBorderColor={colors.primary}>
          <Text style={[styles.heading, {color: colors.text}]}>
            Select relationship goals 💘
          </Text>
          <Text style={[styles.subHeading, {color: colors.textTertiary}]}>
            Choose the type of relationship you are seeking on Datify.
          </Text>

          {mainGoals.map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalDescription}>{goal.description}</Text>
            </View>
          ))}
        </ProgressStep>
      </ProgressSteps>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    paddingVertical: spacing.md,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  backButtonText: {
    color: colors.textSecondary,
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  buttonText: {
    color: colors.background,
    fontWeight: "600",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 16,
  },
  sliderContainer: {
    marginVertical: spacing.lg,
    alignItems: "center",
  },
  slider: {
    width: "100%",
    height: 32,
  },
  goalItem: {
    borderWidth: 1,
    borderColor: colors.textTertiary,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  goalDescription: {
    fontSize: 14,
    color: colors.textTertiary,
  },
});

export default AccountSetup;
