/**
 * Color Palette for PfiAura Migraine App
 *
 * Primary Colors:
 * - Green: #5ad899 (Primary actions, success states)
 * - Yellow: #f7d36c (Warnings, highlights, tints)
 * - Blue: #7592e6 (Information, secondary actions)
 * - Red: #ef4f49 (Errors, alerts, danger)
 * - Black: #020003 (Background, dark surfaces)
 */

const tintColorDark = "#fff";

export const Colors = {
  // Core App Colors
  text: "#ECEDEE",
  background: "#020003",
  tabBarBackground: "#020003",
  tint: "#FFF8DC", // Keep original tint for UI elements
  icon: "#9BA1A6",
  tabIconDefault: "#9BA1A6",
  tabIconSelected: tintColorDark,

  // New Color Palette
  green: "#5ad899",
  yellow: "#f7d36c",
  blue: "#7592e6",
  red: "#ef4f49",
  black: "#020003",

  // Semantic Colors
  primary: "#5ad899",
  secondary: "#7592e6",
  accent: "#f7d36c",
  error: "#ef4f49",
  success: "#5ad899",
  warning: "#f7d36c",
  info: "#7592e6",
};

export const Fonts = {
  headingRegular: "PTSerif_400Regular",
  headingBold: "PTSerif_700Bold",
  body: "Karla_400Regular",
  bodyMedium: "Karla_500Medium",
  bodySemiBold: "Karla_600SemiBold",
  bodyBold: "Karla_700Bold",
};
