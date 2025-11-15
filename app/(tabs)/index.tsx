import { ArchGradient } from "@/components/ArchGradient";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

// 24-hour data for background chart (behind percentage)
const BACKGROUND_24H_DATA = [
  45, 48, 50, 52, 55, 54, 58, 60, 62, 65, 63, 68,
  70, 72, 71, 73, 75, 74, 73, 72, 71, 70, 72, 75
];

const TOP_TRIGGERS = [
  { featureName: "Sleep Quality", currentValue: "4.2 hrs", influence: "+0.21", positive: true },
  { featureName: "Screen Time", currentValue: "6.8 hrs", influence: "+0.18", positive: true },
  { featureName: "Caffeine Intake", currentValue: "3 cups", influence: "+0.15", positive: true },
];

const PREVENTATIVE_SUGGESTIONS = [
  {
    metricName: "Sleep Duration",
    direction: "increase",
    delta: "+1.5 hrs",
    explanation: "Increasing sleep to 7.5 hours can reduce migraine risk by 15%"
  },
  {
    metricName: "Screen Time",
    direction: "decrease",
    delta: "-2 hrs",
    explanation: "Reducing screen time can lower eye strain-related triggers"
  },
  {
    metricName: "Water Intake",
    direction: "increase",
    delta: "+500ml",
    explanation: "Better hydration helps prevent dehydration-induced migraines"
  },
];

// Background chart - Revolut style behind percentage
function BackgroundChart({ data, width = 400, height = 240 }: { data: number[], width?: number, height?: number }) {
  const values = data;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  // Generate smooth bezier curve points
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return { x, y };
  });

  // Create smooth path using quadratic bezier curves
  let pathD = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;

    pathD += ` Q ${current.x},${current.y} ${midX},${midY}`;
  }

  // Complete the curve to the last point
  const last = points[points.length - 1];
  const secondLast = points[points.length - 2];
  pathD += ` Q ${secondLast.x},${secondLast.y} ${last.x},${last.y}`;

  // Create filled area path
  const filledPath = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="bgChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.10" />
          <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
        </LinearGradient>
      </Defs>

      {/* Filled gradient area */}
      <Path
        d={filledPath}
        fill="url(#bgChartGradient)"
      />

      {/* Stroke line */}
      <Path
        d={pathD}
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const percentage = 12;

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

      <ArchGradient percentage={percentage} />

      {/* Background chart - behind percentage (Revolut style) */}
      <View style={styles.backgroundChartContainer}>
        <BackgroundChart data={BACKGROUND_24H_DATA} width={400} height={60} />
      </View>

      {/* Prediction percentage under the arch */}
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>{percentage}%</Text>
        <Text style={styles.percentageLabel}>chance of migraine</Text>
      </View>

      {/* Scrollable analytics content */}
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top 3 trigger features */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Top 3 trigger features now</Text>
          {TOP_TRIGGERS.map((trigger, index) => (
            <View key={index} style={styles.triggerRow}>
              <View style={styles.triggerInfo}>
                <Text style={styles.triggerName}>{trigger.featureName}</Text>
                <Text style={styles.triggerValue}>{trigger.currentValue}</Text>
              </View>
              <Text style={[
                styles.triggerInfluence,
                { color: trigger.positive ? "#4AE082" : "#FF0000" }
              ]}>
                {trigger.influence}
              </Text>
            </View>
          ))}
        </View>

        {/* 4. Preventative suggestions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preventative suggestions</Text>
          {PREVENTATIVE_SUGGESTIONS.map((suggestion, index) => (
            <View key={index} style={styles.suggestionCard}>
              <View style={styles.suggestionHeader}>
                <Text style={styles.suggestionMetric}>{suggestion.metricName}</Text>
                <View style={styles.suggestionBadge}>
                  <Text style={[
                    styles.suggestionDirection,
                    { color: suggestion.direction === "increase" ? "#4AE082" : "#FF9500" }
                  ]}>
                    {suggestion.direction === "increase" ? "↑" : "↓"} {suggestion.delta}
                  </Text>
                </View>
              </View>
              <Text style={styles.suggestionExplanation}>{suggestion.explanation}</Text>
            </View>
          ))}
        </View>

        {/* Bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  menuButton: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  backgroundChartContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1,
    opacity: 0.7,
    overflow: "hidden",
  },
  percentageContainer: {
    position: "absolute",
    top: 200,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 5,
  },
  percentageText: {
    fontSize: 56,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  percentageLabel: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9BA1A6",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  scrollContent: {
    flex: 1,
    marginTop: 250,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.tint,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  triggerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  triggerInfo: {
    flex: 1,
  },
  triggerName: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 4,
  },
  triggerValue: {
    fontSize: 13,
    color: "#9BA1A6",
  },
  triggerInfluence: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },
  suggestionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  suggestionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  suggestionMetric: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  suggestionBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  suggestionDirection: {
    fontSize: 14,
    fontWeight: "700",
  },
  suggestionExplanation: {
    fontSize: 13,
    color: "#9BA1A6",
    lineHeight: 18,
  },
});
