/* eslint-disable import/no-named-as-default */
import CollapsibleChartGroup from "@/components/analysis/CollapsibleChartGroup";
import FeatureDropdown from "@/components/analysis/FeatureDropdown";
import { Colors, Fonts } from "@/constants/theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnalysisScreen() {
  const insets = useSafeAreaInsets();
  // Tab bar height: ~76px (60 minHeight + 16 padding) + bottom safe area
  const tabBarHeight = 76 + Math.max(insets.bottom, 20);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={{ width: 28 }} />

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerEyebrow}>Insights</Text>
          <Text style={styles.headerTitle}>Analysis</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: tabBarHeight + 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            paddingVertical: 20,
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
                fontSize: 20,
                color: Colors.tint,
                fontFamily: Fonts.bodySemiBold,
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
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  headerEyebrow: {
    fontSize: 12,
    letterSpacing: 1,
    color: "rgba(255, 255, 255, 0.55)",
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.tint,
    letterSpacing: 0.2,
    textAlign: "center",
  },
  headerRightSpacer: {
    width: 28,
  },
  title: {
    fontSize: 32,
    color: Colors.tint,
    marginTop: 60,
    fontFamily: Fonts.headingBold,
  },
});
