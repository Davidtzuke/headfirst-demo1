/* eslint-disable import/no-named-as-default */
import CollapsibleChartGroup from "@/components/analysis/CollapsibleChartGroup";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <TouchableOpacity
          style={[styles.menuButton]}
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

          <CollapsibleChartGroup
            charts={[
              {
                id: "triggers",
                title: "Triggers",
                data: [
                  { name: "Stress", value: 0.85 },
                  { name: "Lack of Sleep", value: -0.7 },
                  { name: "Caffeine", value: 0.55 },
                ],
                maxAbsValue: 1,
              },
              {
                id: "preceding_symptoms",
                title: "Preceding Symptoms",
                data: [
                  { name: "Blurred Vision", value: 0.8 },
                  { name: "Neck Pain", value: -0.65 },
                  { name: "Fatigue", value: 0.45 },
                ],
                maxAbsValue: 1,
              },
              {
                id: "symptoms",
                title: "Symptoms",
                data: [
                  { name: "Headache", value: 0.95 },
                  { name: "Nausea", value: -0.6 },
                  { name: "Light Sensitivity", value: 0.5 },
                ],
                maxAbsValue: 1,
              },
            ]}
            defaultExpandedId="triggers"
          />
        </View>
      </ScrollView>
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
  menuButton: {},
  title: {
    fontSize: 32,
    color: Colors.tint,
    marginTop: 60,
  },
});
