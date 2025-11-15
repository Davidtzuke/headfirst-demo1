import { Colors } from "@/constants/theme";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  G,
  Line,
  Polyline,
  Text as SvgText,
} from "react-native-svg";

export interface DateValueDataPoint {
  date: Date;
  value: number;
}

interface FeatureGraphDropdownProps {
  title?: string;
  data: DateValueDataPoint[];
  height?: number;
  padding?: number;
  showGrid?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 70;
const DEFAULT_HEIGHT = 400;
const DEFAULT_PADDING = 30;

export const FeatureGraph: React.FC<FeatureGraphDropdownProps> = ({
  title,
  data,
  height = DEFAULT_HEIGHT,
  padding = DEFAULT_PADDING,
  showGrid = true,
}) => {
  const chartWidth = CHART_WIDTH - padding * 2;
  const chartHeight = height - padding * 2;

  const { points, minValue, maxValue, minDate, maxDate } = useMemo(() => {
    if (data.length === 0) {
      return {
        points: [],
        minValue: 0,
        maxValue: 0,
        minDate: new Date(),
        maxDate: new Date(),
      };
    }

    const values = data.map((d) => d.value);
    const dates = data.map((d) => d.date.getTime());

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);

    // Add some padding to the value range
    const valueRange = maxValue - minValue;
    const paddedMinValue = minValue - valueRange * 0.1;
    const paddedMaxValue = maxValue + valueRange * 0.1;

    const xScale = chartWidth / (maxDate - minDate || 1);
    const yScale = chartHeight / (paddedMaxValue - paddedMinValue || 1);

    const points = data.map((point) => ({
      x: (point.date.getTime() - minDate) * xScale + padding,
      y: chartHeight - (point.value - paddedMinValue) * yScale + padding,
      value: point.value,
      date: point.date,
    }));

    return {
      points,
      minValue: paddedMinValue,
      maxValue: paddedMaxValue,
      minDate: new Date(minDate),
      maxDate: new Date(maxDate),
    };
  }, [data, chartWidth, chartHeight, padding]);

  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const formatValue = (value: number): string => {
    if (Math.abs(value) >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    }
    return value.toFixed(1);
  };

  // Generate grid lines and labels
  const xAxisLabels = useMemo(() => {
    if (data.length === 0) return [];
    const numLabels = 5;
    const labels = [];
    for (let i = 0; i <= numLabels; i++) {
      const date = new Date(
        minDate.getTime() +
          ((maxDate.getTime() - minDate.getTime()) * i) / numLabels
      );
      labels.push({
        date,
        x: padding + (chartWidth * i) / numLabels,
      });
    }
    return labels;
  }, [minDate, maxDate, chartWidth, padding, data.length]);

  const yAxisLabels = useMemo(() => {
    if (data.length === 0 || maxValue === minValue) return [];
    const numLabels = 5;
    const labels = [];
    for (let i = 0; i <= numLabels; i++) {
      const value = minValue + ((maxValue - minValue) * i) / numLabels;
      labels.push({
        value,
        y: chartHeight - (chartHeight * i) / numLabels + padding,
      });
    }
    return labels;
  }, [minValue, maxValue, chartHeight, padding, data.length]);

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}

        <View style={[styles.chartContainer, { height }]}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={[styles.chartContainer, { height }]}>
        <Svg width={CHART_WIDTH} height={height}>
          {/* Grid lines */}
          {showGrid && (
            <G>
              {xAxisLabels.map((label, i) => (
                <Line
                  key={`x-grid-${i}`}
                  x1={label.x}
                  y1={padding}
                  x2={label.x}
                  y2={chartHeight + padding}
                  stroke="rgba(255, 248, 220, 0.1)"
                  strokeWidth="1"
                />
              ))}
              {yAxisLabels.map((label, i) => (
                <Line
                  key={`y-grid-${i}`}
                  x1={padding}
                  y1={label.y}
                  x2={chartWidth + padding}
                  y2={label.y}
                  stroke="rgba(255, 248, 220, 0.1)"
                  strokeWidth="1"
                />
              ))}
            </G>
          )}

          {/* Y-axis labels */}
          {yAxisLabels.map((label, i) => (
            <SvgText
              key={`y-label-${i}`}
              x={padding - 8}
              y={label.y + 4}
              fontSize="10"
              fill={Colors.tint}
              textAnchor="end"
            >
              {formatValue(label.value)}
            </SvgText>
          ))}

          {/* X-axis labels */}
          {xAxisLabels.map((label, i) => (
            <SvgText
              key={`x-label-${i}`}
              x={label.x}
              y={height - padding + 20}
              fontSize="10"
              fill={Colors.tint}
              textAnchor="middle"
            >
              {formatDate(label.date)}
            </SvgText>
          ))}

          {/* Axes */}
          <Line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight + padding}
            stroke={Colors.tint}
            strokeWidth="2"
            opacity={0.3}
          />
          <Line
            x1={padding}
            y1={chartHeight + padding}
            x2={chartWidth + padding}
            y2={chartHeight + padding}
            stroke={Colors.tint}
            strokeWidth="2"
            opacity={0.3}
          />

          {/* Data line */}
          {points.length > 0 && (
            <Polyline
              points={points.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#4ae082"
              strokeWidth="2"
            />
          )}

          {/* Data points */}
          {points.map((point, i) => (
            <Circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#4ae082"
            />
          ))}
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
    padding: 12,
    borderColor: "rgba(255, 248, 220, 0.2)",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
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
  },
});

export default FeatureGraph;
