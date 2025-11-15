/* eslint-disable import/no-named-as-default */
import HorizontalBarChart from "@/components/analysis/HorizontalBarChart";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

      <View
        style={{
          paddingVertical: 32,
        }}
      >
        <View
          style={{
            gap: 8,
            paddingBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: "#fff",
              fontWeight: 800,
            }}
          >
            Analysis
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: Colors.tint,
              fontWeight: 600,
            }}
          >
            See which triggers, preceding symptoms, and symptoms are most
            strongly associated with migraines.
          </Text>
        </View>

        <HorizontalBarChart
          title="Triggers"
          data={[
            { name: "Stress", value: 0.85 },
            { name: "Lack of Sleep", value: -0.7 },
            { name: "Caffeine", value: 0.55 },
          ]}
          maxAbsValue={1}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 32,
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
