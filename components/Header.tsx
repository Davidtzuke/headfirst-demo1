import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
      <View style={styles.leftSpacer} />

      <View style={styles.centerContent}>
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

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.push("/profile")}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={32}
          color={Colors.icon}
        />
      </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  leftSpacer: {
    width: 36, // Same width as profile button to keep center content centered
  },
  centerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    letterSpacing: 0.5,
  },
  profileButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
