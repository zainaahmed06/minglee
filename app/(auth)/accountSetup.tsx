import Button from "@/components/Button";
import {Input} from "@/components/Input";
import {BirthDay} from "@/constants/MingleeIcons";
import {colors, radius, spacing} from "@/theme";
import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {ProgressStep, ProgressSteps} from "react-native-progress-steps";
import {SafeAreaView} from "react-native-safe-area-context";

const AccountSetup = () => {
  const [username, setUsername] = useState("");
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
        <ProgressStep>
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
        <ProgressStep>
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
        <ProgressStep>
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
        <ProgressStep>
          <Text style={[styles.heading, {color: colors.text}]}>
            Find matches nearby📍
          </Text>
          <Text style={[styles.subHeading, {color: colors.text}]}>
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
            <Text style={[styles.subHeading, {color: colors.text}]}>
              180 KM
            </Text>
          </View>
        </ProgressStep>
        {/* Show your best self */}
        <ProgressStep>
          <View>
            <Text>Show your best self</Text>
          </View>
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
});

export default AccountSetup;
