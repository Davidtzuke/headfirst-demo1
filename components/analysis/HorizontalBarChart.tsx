import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type BarItem = {
  name: string;
  value: number; // correlation, can be negative
};

interface HorizontalBarChartProps {
  title: string;
  data: BarItem[];
  maxAbsValue: number; // for scaling bars
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  title,
  data,
  maxAbsValue,
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>{title}</Text>

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
                      },
                    ]}
                  />

                  {isPositive && (
                    <View style={{ width: `${barWidthPercent}%` }} />
                  )}
                </View>
              </View>

              <Text style={styles.barValue}>{item.value.toFixed(2)}</Text>
            </View>
          );
        })}
      </View>
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
    fontSize: 20,
    fontWeight: "600",
    color: Colors.tint,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
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
    color: Colors.text,
    fontWeight: "500",
  },
  barBackground: {
    flex: 1,
    height: 32,
    backgroundColor: Colors.tabBarBackground,
    borderRadius: 8,
    marginHorizontal: 8,
    position: "relative",
    overflow: "hidden",
  },
  centerLine: {
    position: "absolute",
    left: "50%",
    width: 1,
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
    borderRadius: 8,
  },
  barValue: {
    width: 50,
    textAlign: "right",
    fontSize: 12,
    color: Colors.text,
    fontWeight: "500",
  },
});

export default HorizontalBarChart;
