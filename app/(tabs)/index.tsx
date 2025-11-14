import { Colors } from "@/constants/theme";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Welcome back, user.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 32,
  },
  title: {
    fontSize: 32,
    color: Colors.tint,
  },
});
