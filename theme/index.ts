import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ColorPalette, FontSizeScale, RadiusScale, SpacingScale} from "./types";

// Light theme colors
export const colors: ColorPalette = {
  // Primary colors - Modern crypto blue/purple gradient

  primary: "#9610FF", // Indigo
  primaryLight: "#818cf8",
  primaryDark: "#4338ca",
  secondary: "#06b6d4", // Cyan
  secondaryLight: "#22d3ee",
  secondaryDark: "#0891b2",

  // Background colors

  background: "#ffffff",
  backgroundSecondary: "#f8fafc",
  backgroundTertiary: "#f1f5f9",
  surface: "#EBEBEB",
  surfaceSecondary: "#f8fafc",

  // Text colors

  text: "#0f172a",
  textSecondary: "#475569",
  textTertiary: "#94a3b8",
  textInverse: "#ffffff",

  // Status colors

  success: "#10b981",
  successLight: "#34d399",
  danger: "#ef4444",
  dangerLight: "#FFD8D8",
  warning: "#f59e0b",
  warningLight: "#fbbf24",
  info: "#3b82f6",
  infoLight: "#60a5fa",

  // Crypto specific colors

  bull: "#16a34a", // Green for gains
  bear: "#dc2626", // Red for losses
  neutral: "#6b7280", // Gray for no change

  // Border and divider colors

  border: "#e2e8f0",
  borderSecondary: "#cbd5e1",
  divider: "#e2e8f0",
};

// Responsive spacing scale
export const spacing: SpacingScale = {
  xs: wp("1%"), // ~4px on most devices
  sm: wp("2%"), // ~8px on most devices
  md: wp("4%"), // ~16px on most devices
  lg: wp("6%"), // ~24px on most devices
  xl: wp("8%"), // ~32px on most devices
  xxl: wp("12%"), // ~48px on most devices
  xxxl: wp("16%"), // ~64px on most devices
};

// Responsive border radius scale
export const radius: RadiusScale = {
  xs: wp("1%"), // ~4px
  sm: wp("2%"), // ~8px
  md: wp("3%"), // ~12px
  lg: wp("4%"), // ~16px
  xl: wp("6%"), // ~24px
  full: 9999, // Fully rounded
};

// Responsive font size scale
export const fontSizes: FontSizeScale = {
  xxs: wp("2.5%"), // ~8px
  xs: wp("3%"), // ~12px
  sm: wp("3.5%"), // ~14px
  md: wp("4%"), // ~16px
  lg: wp("4.5%"), // ~18px
  xl: wp("5%"), // ~20px
  xxl: wp("6%"), // ~24px
  xxxl: wp("8%"), // ~32px
  xxxxl: wp("10%"), // ~32px
};
