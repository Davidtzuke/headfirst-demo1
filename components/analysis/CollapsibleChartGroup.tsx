import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BarItem, HorizontalBarChart } from "./HorizontalBarChart";

export interface ChartData {
  id: string;
  title: string;
  data: BarItem[];
  maxAbsValue: number;
}

interface CollapsibleChartGroupProps {
  charts: ChartData[];
  defaultExpandedId?: string;
  gap?: number;
}

export const CollapsibleChartGroup: React.FC<CollapsibleChartGroupProps> = ({
  charts,
  defaultExpandedId,
  gap = 16,
}) => {
  const [expandedId, setExpandedId] = useState<string | undefined>(
    defaultExpandedId
  );

  const handleToggle = (id: string) => {
    setExpandedId((current) => (current === id ? undefined : id));
  };

  return (
    <View style={[styles.container, { gap }]}>
      {charts.map((chart) => (
        <HorizontalBarChart
          key={chart.id}
          title={chart.title}
          data={chart.data}
          maxAbsValue={chart.maxAbsValue}
          isExpanded={expandedId === chart.id}
          onToggle={() => handleToggle(chart.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default CollapsibleChartGroup;

