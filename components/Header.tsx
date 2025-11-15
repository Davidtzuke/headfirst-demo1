import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";

export function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, Platform.OS === "ios" ? 10 : 20),
        },
      ]}
    >
      <Image
        source={require("../assets/images/icon-color.png")}
        width={36}
        height={36}
        style={{
          maxWidth: 32,
          maxHeight: 32,
          resizeMode: "contain",
        }}
      />

      <Text style={styles.title}>HeadFirst</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    letterSpacing: 0.5,
  },
});
