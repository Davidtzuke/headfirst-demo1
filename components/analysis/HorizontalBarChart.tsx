import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type BarItem = {
  name: string;
  value: number; // correlation, can be negative
};

interface HorizontalBarChartProps {
  title: string;
  data: BarItem[];
  maxAbsValue: number; // for scaling bars
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  title,
  data,
  maxAbsValue,
}) => {
  const [expanded, setExpanded] = useState(false);
  const rotation = useSharedValue(expanded ? 0 : 180);
  const maxHeight = useSharedValue(expanded ? 1000 : 0);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    rotation.value = withTiming(expanded ? 0 : 180, { duration: 300 });
    maxHeight.value = withTiming(expanded ? 1000 : 0, { duration: 300 });
  }, [expanded, rotation, maxHeight]);

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      maxHeight: maxHeight.value,
      opacity: maxHeight.value > 0 ? 1 : 0,
    };
  });

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <Text style={styles.headerText}>{title}</Text>
        <Animated.View style={chevronStyle}>
          <MaterialCommunityIcons name="chevron-up" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <Animated.View style={[styles.contentWrapper, containerStyle]}>
          <View style={styles.chartContainer}>
            {data.map((item) => {
              const percentage = (item.value / maxAbsValue) * 100;
              const isPositive = item.value >= 0;
              const barWidthPercent = Math.abs(percentage) / 2;

              return (
                <View key={item.name} style={styles.barRow}>
                  <Text style={styles.barLabel}>{item.name}</Text>

                  <View style={styles.barBackground}>
                    <View style={styles.centerLine} />

                    <View style={styles.barContainer}>
                      {!isPositive && (
                        <View style={{ width: `${barWidthPercent}%` }} />
                      )}

                      <View
                        style={[
                          styles.barFill,
                          {
                            width: `${barWidthPercent}%`,
                            backgroundColor: isPositive ? "#4ae082" : "#ff4d4f",
                            borderTopLeftRadius: isPositive ? 0 : 8,
                            borderBottomLeftRadius: isPositive ? 0 : 8,
                            borderTopRightRadius: isPositive ? 8 : 0,
                            borderBottomRightRadius: isPositive ? 8 : 0,
                          },
                        ]}
                      />

                      {isPositive && (
                        <View style={{ width: `${barWidthPercent}%` }} />
                      )}
                    </View>
                  </View>

                  <Text style={styles.barValue}>
                    {Math.round(item.value * 100)}%
                  </Text>
                </View>
              );
            })}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 12,
    backgroundColor: Colors.background,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 248, 220, 0.2)", // Colors.tint with 20% opacity
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  contentWrapper: {
    overflow: "hidden",
  },
  chartContainer: {
    padding: 16,
    backgroundColor: Colors.background,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  barLabel: {
    width: 100,
    fontSize: 14,
    color: Colors.tint,
    fontWeight: "500",
  },
  barBackground: {
    flex: 1,
    height: 32,
    backgroundColor: "#000112",
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 248, 220, 0.2)", // Colors.tint with 20% opacity
  },
  centerLine: {
    position: "absolute",
    left: "50%",
    width: 2,
    height: "100%",
    backgroundColor: "rgba(255, 248, 220, 0.4)", // Colors.tint with 40% opacity
    zIndex: 1,
  },
  barContainer: {
    flexDirection: "row-reverse",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  barFill: {
    height: "100%",
  },
  barValue: {
    width: 50,
    textAlign: "right",
    fontSize: 14,
    color: Colors.tint,
    fontWeight: "500",
  },
});

export default HorizontalBarChart;
