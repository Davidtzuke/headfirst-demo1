import { Colors } from "@/constants/theme";
import { useStorageState } from "@/hooks/useStorageState";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const [[isLoading, isAuthenticated]] = useStorageState("isAuthenticated");

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated === "true") {
        // User is authenticated, redirect to tabs
        router.replace("/(tabs)");
      } else {
        // User is not authenticated, redirect to login
        router.replace("/login");
      }
    }
  }, [isLoading, isAuthenticated]);

  // Show loading indicator while checking authentication
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
