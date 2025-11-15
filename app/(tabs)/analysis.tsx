/* eslint-disable import/no-named-as-default */
import CollapsibleChartGroup from "@/components/analysis/CollapsibleChartGroup";
import FeatureDropdown from "@/components/analysis/FeatureDropdown";
import { Colors } from "@/constants/theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnalysisScreen() {
  const insets = useSafeAreaInsets();
  // Tab bar height: ~76px (60 minHeight + 16 padding) + bottom safe area
  const tabBarHeight = 76 + Math.max(insets.bottom, 20);

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
      >
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

        <FeatureDropdown />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  menuButton: {},
  title: {
    fontSize: 32,
    color: Colors.tint,
    marginTop: 60,
  },
});
