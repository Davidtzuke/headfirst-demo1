import { Fonts } from "@/constants/theme";
import {
  PTSerif_400Regular,
  PTSerif_700Bold,
} from "@expo-google-fonts/pt-serif";
import {
  Karla_400Regular,
  Karla_500Medium,
  Karla_600SemiBold,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    const textComponent = Text as typeof Text & {
      defaultProps?: { style?: TextStyle };
    };
    const existing = StyleSheet.flatten(
      (textComponent.defaultProps?.style as TextStyle) ?? {}
    );

    textComponent.defaultProps = {
      ...textComponent.defaultProps,
      style: {
        ...existing,
        fontFamily: Fonts.body,
      },
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
