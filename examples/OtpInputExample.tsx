import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import {colors, fontSizes, spacing} from "@/theme";
import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";

const OtpInputExample = () => {
  const [otp4, setOtp4] = useState("");
  const [otp6, setOtp6] = useState("");
  const [otpSecure, setOtpSecure] = useState("");
  const [otpAlphaNumeric, setOtpAlphaNumeric] = useState("");
  const [otpCustom, setOtpCustom] = useState("");

  const clearOtps = () => {
    setOtp4("");
    setOtp6("");
    setOtpSecure("");
    setOtpAlphaNumeric("");
    setOtpCustom("");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>OTP Input Examples</Text>

      {/* Standard 4-digit OTP */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Standard 4-digit OTP</Text>
        <OtpInput
          value={otp4}
          onValueChange={setOtp4}
          codeLength={4}
          onInputComplete={(code: string) =>
            console.log("Completed 4-digit code:", code)
          }
        />
        <Text style={styles.valueText}>Value: {otp4}</Text>
      </View>

      {/* 6-digit OTP */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6-digit OTP</Text>
        <OtpInput
          value={otp6}
          onValueChange={setOtp6}
          codeLength={6}
          onInputComplete={(code: string) =>
            console.log("Completed 6-digit code:", code)
          }
        />
        <Text style={styles.valueText}>Value: {otp6}</Text>
      </View>

      {/* Secure OTP (Password-like) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Secure OTP (Password-like)</Text>
        <OtpInput
          value={otpSecure}
          onValueChange={setOtpSecure}
          codeLength={4}
          secureTextEntry
          onInputComplete={(code: string) =>
            console.log("Completed secure code:", code)
          }
        />
        <Text style={styles.valueText}>Value: {otpSecure}</Text>
      </View>

      {/* Alphanumeric OTP */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alphanumeric OTP</Text>
        <OtpInput
          value={otpAlphaNumeric}
          onValueChange={setOtpAlphaNumeric}
          codeLength={4}
          keyboardType='default'
          onInputComplete={(code: string) =>
            console.log("Completed alphanumeric code:", code)
          }
        />
        <Text style={styles.valueText}>Value: {otpAlphaNumeric}</Text>
      </View>

      {/* Custom Styled OTP */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styled OTP</Text>
        <OtpInput
          value={otpCustom}
          onValueChange={setOtpCustom}
          codeLength={4}
          cellStyle={styles.customCell}
          activeCellStyle={styles.customActiveCell}
          textStyle={styles.customText}
          activeTextStyle={styles.customActiveText}
          containerStyle={styles.customContainer}
          onInputComplete={(code: string) =>
            console.log("Completed custom code:", code)
          }
        />
        <Text style={styles.valueText}>Value: {otpCustom}</Text>
      </View>

      <Button onPress={clearOtps} color='primary' style={styles.clearButton}>
        Clear All
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: spacing.md,
  },
  title: {
    fontSize: 24,
    fontFamily: "UrbanistBold",
    marginBottom: spacing.lg,
    textAlign: "center",
    color: colors.text,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "UrbanistBold",
    marginBottom: spacing.sm,
    color: colors.textSecondary,
  },
  valueText: {
    marginTop: spacing.sm,
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
  },
  clearButton: {
    marginVertical: spacing.lg,
  },
  // Custom styles for the last example
  customContainer: {
    marginTop: spacing.xs,
  },
  customCell: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    width: spacing.xxxl + spacing.sm,
    height: spacing.xxxl + spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  customActiveCell: {
    backgroundColor: colors.primary + "20", // 20% opacity
    borderColor: colors.primary,
    borderWidth: 2,
  },
  customText: {
    color: colors.secondary,
    fontSize: 26,
  },
  customActiveText: {
    color: colors.primary,
    fontFamily: "UrbanistBold",
  },
});

export default OtpInputExample;
