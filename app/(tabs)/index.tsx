import { ArchGradient } from "@/components/ArchGradient";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity
        style={[styles.menuButton, { top: insets.top + 16 }]}
        onPress={() => {
          // @ts-ignore - drawer navigation type
          navigation.openDrawer();
        }}
      >
        <MaterialCommunityIcons name="menu" size={28} color={Colors.tint} />
      </TouchableOpacity>

      <ArchGradient percentage={75} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 32,
  },
  menuButton: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  title: {
    fontSize: 32,
    color: Colors.tint,
    marginTop: 60,
  },
});
