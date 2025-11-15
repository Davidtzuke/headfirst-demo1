import { Colors, Fonts } from "@/constants/theme";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { G, Line, Rect, Text as SvgText } from "react-native-svg";

export interface DateValueDataPoint {
  date: Date;
  value: number;
}

interface FeatureHistogramProps {
  data: DateValueDataPoint[];
  bins?: number; // number of intervals
  height?: number;
  padding?: number;
  showGrid?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 60;
const DEFAULT_HEIGHT = 300;
const DEFAULT_PADDING = 40;

const formatValue = (value: number) => {
  if (Math.abs(value) >= 1000) return (value / 1000).toFixed(1) + "k";
  return value.toFixed(0);
};

export const FeatureHistogram: React.FC<FeatureHistogramProps> = ({
  data,
  bins = 10,
  height = DEFAULT_HEIGHT,
  padding = DEFAULT_PADDING,
  showGrid = true,
}) => {
  const { histogram, maxCount, minValue, maxValue } = useMemo(() => {
    if (!data.length)
      return { histogram: [], maxCount: 0, minValue: 0, maxValue: 0 };

    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const binSize = (maxValue - minValue) / bins;
    const histogram = new Array(bins).fill(0);

    values.forEach((v) => {
      let index = Math.floor((v - minValue) / binSize);
      if (index === bins) index = bins - 1;
      histogram[index]++;
    });

    const maxCount = Math.max(...histogram);

    return { histogram, maxCount, minValue, maxValue };
  }, [data, bins]);

  if (!data.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Distribution</Text>

        <View style={[styles.chartContainer, { height }]}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      </View>
    );
  }

  const chartWidth = CHART_WIDTH - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / bins - 6;

  // horizontal grid lines and Y-axis labels
  const yAxisLabels = [];
  const numGridLines = 5;
  for (let i = 0; i <= numGridLines; i++) {
    const y = chartHeight - (chartHeight * i) / numGridLines + padding;
    const value = (maxCount * i) / numGridLines;
    yAxisLabels.push({ y, value });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distribution</Text>

      <View style={[styles.chartContainer, { height }]}>
        <Svg width={CHART_WIDTH} height={height}>
          {/* Grid lines */}
          {showGrid && (
            <G>
              {/* Horizontal lines */}
              {yAxisLabels.map((label, i) => (
                <Line
                  key={`y-grid-${i}`}
                  x1={padding}
                  y1={label.y}
                  x2={chartWidth + padding}
                  y2={label.y}
                  stroke="rgba(255, 248, 220, 0.1)"
                  strokeWidth={1}
                />
              ))}

              {/* Vertical lines at each bar */}
              {histogram.map((_, i) => {
                const x = padding + i * (barWidth + 6) + barWidth / 2;
                return (
                  <Line
                    key={`x-grid-${i}`}
                    x1={x}
                    y1={padding}
                    x2={x}
                    y2={chartHeight + padding}
                    stroke="rgba(255, 248, 220, 0.05)"
                    strokeWidth={1}
                  />
                );
              })}
            </G>
          )}

          {/* Axes */}
          {/* Y-axis */}
          <Line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight + padding}
            stroke={Colors.tint}
            strokeWidth={2}
            opacity={0.3}
          />
          {/* X-axis */}
          <Line
            x1={padding}
            y1={chartHeight + padding}
            x2={chartWidth + padding}
            y2={chartHeight + padding}
            stroke={Colors.tint}
            strokeWidth={2}
            opacity={0.3}
          />

          {/* Y-axis labels */}
          {yAxisLabels.map((label, i) => (
            <SvgText
              key={`y-label-${i}`}
              x={padding - 8}
              y={label.y + 4}
              fontSize={10}
              fill={Colors.tint}
              textAnchor="end"
            >
              {formatValue(label.value)}
            </SvgText>
          ))}

          {/* Bars */}
          {histogram.map((count, i) => {
            const barHeight = (count / maxCount) * chartHeight;
            const x = padding + i * (barWidth + 6);
            const y = chartHeight + padding - barHeight;
            return (
              <Rect
                key={`bar-${i}`}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#4ae082"
                rx={4}
              />
            );
          })}

          {/* X-axis labels (bin start values) */}
          {histogram.map((_, i) => {
            const binStart = minValue + ((maxValue - minValue) / bins) * i;
            const x = padding + i * (barWidth + 6) + barWidth / 2;
            const y = chartHeight + padding + 14;
            return (
              <SvgText
                key={`x-label-${i}`}
                x={x}
                y={y}
                fontSize={10}
                fill={Colors.tint}
                textAnchor="middle"
              >
                {formatValue(binStart)}
              </SvgText>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,248,220,0.2)",
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    fontFamily: Fonts.headingBold,
    paddingHorizontal: 4,
  },
  chartContainer: {
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: Colors.tint,
    fontSize: 14,
    opacity: 0.6,
    fontFamily: Fonts.body,
  },
});

export default FeatureHistogram;
