import { ArchGradient } from "@/components/ArchGradient";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Svg, { Path, Defs, LinearGradient, Stop, Text as SvgText } from "react-native-svg";

// Placeholder data
const BACKGROUND_PREDICTION_DATA = [45, 50, 48, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75];
const PREDICTION_24H_DATA = [
  { time: "0h", value: 45 },
  { time: "6h", value: 52 },
  { time: "12h", value: 68 },
  { time: "18h", value: 73 },
  { time: "24h", value: 75 },
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

// Mini sparkline chart component
function MiniSparkline({ data, width = 280, height = 60 }: { data: number[], width?: number, height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const pathD = `M ${points} L ${width},${height} L 0,${height} Z`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#4AE082" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#4AE082" stopOpacity="0.05" />
        </LinearGradient>
      </Defs>
      <Path d={pathD} fill="url(#sparklineGradient)" />
      <Path
        d={`M ${points}`}
        stroke="#4AE082"
        strokeWidth="2"
        fill="none"
      />
    </Svg>
  );
}

// 24h time series chart component
function TimeSeriesChart({ data, width = 320, height = 150 }: { data: typeof PREDICTION_24H_DATA, width?: number, height?: number }) {
  const values = data.map(d => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min;

  const chartHeight = height - 30; // Leave space for labels
  const chartWidth = width - 40; // Leave space for padding

  const points = data.map((item, index) => {
    const x = 20 + (index / (data.length - 1)) * chartWidth;
    const y = 10 + chartHeight - ((item.value - min) / range) * chartHeight;
    return { x, y, time: item.time };
  });

  const pathPoints = points.map(p => `${p.x},${p.y}`).join(" ");
  const pathD = `M ${pathPoints}`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="timeseriesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#4AE082" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#4AE082" stopOpacity="0.05" />
        </LinearGradient>
      </Defs>

      {/* Filled area */}
      <Path
        d={`${pathD} L ${points[points.length - 1].x},${chartHeight + 10} L ${points[0].x},${chartHeight + 10} Z`}
        fill="url(#timeseriesGradient)"
      />

      {/* Line */}
      <Path
        d={pathD}
        stroke="#4AE082"
        strokeWidth="3"
        fill="none"
      />

      {/* Time labels */}
      {points.map((point, index) => (
        <SvgText
          key={index}
          x={point.x}
          y={height - 5}
          fill="#9BA1A6"
          fontSize="10"
          textAnchor="middle"
        >
          {point.time}
        </SvgText>
      ))}
    </Svg>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const percentage = 75;

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

      {/* Prediction percentage under the arch */}
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>

      {/* Scrollable analytics content */}
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Background prediction time series */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Background prediction time series</Text>
          <View style={styles.chartContainer}>
            <MiniSparkline data={BACKGROUND_PREDICTION_DATA} width={280} height={60} />
          </View>
        </View>

        {/* 2. Prediction percentage - 24h */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Prediction % (last 24h)</Text>
          <View style={styles.chartContainer}>
            <TimeSeriesChart data={PREDICTION_24H_DATA} width={320} height={150} />
          </View>
        </View>

        {/* 3. Top 3 trigger features */}
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
  percentageContainer: {
    position: "absolute",
    top: 230,
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
  scrollContent: {
    flex: 1,
    marginTop: 310,
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
  chartContainer: {
    alignItems: "center",
    paddingVertical: 10,
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
