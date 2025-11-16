import React, { useMemo, useRef } from "react";
import { Platform, View, ViewStyle } from "react-native";
import Svg, {
  ClipPath,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

type RGB = { r: number; g: number; b: number };

interface ArchGradientProps {
  percentage?: number; // 0–100, determines color mix
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}

let instanceCounter = 0;

const COLOR_GREEN: RGB = { r: 74, g: 224, b: 130 }; // #4AE082
const COLOR_RED: RGB = { r: 255, g: 0, b: 0 }; // #FF0000

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const mixRgb = (start: RGB, end: RGB, t: number): RGB => ({
  r: Math.round(lerp(start.r, end.r, t)),
  g: Math.round(lerp(start.g, end.g, t)),
  b: Math.round(lerp(start.b, end.b, t)),
});

const toRgbString = ({ r, g, b }: RGB): string => `rgb(${r}, ${g}, ${b})`;

export const ArchGradient: React.FC<ArchGradientProps> = ({
  percentage = 50,
  style,
}) => {
  const instanceId = useRef(++instanceCounter).current;
  const gradientId = `archGradientFill-${instanceId}`;
  const clipId = `archClip-${instanceId}`;

  const eased = useMemo(
    () => Math.pow(clamp(percentage / 100, 0, 1), 1.2),
    [percentage]
  );

  const gradientColor = useMemo(
    () => toRgbString(mixRgb(COLOR_GREEN, COLOR_RED, eased)),
    [eased]
  );

  return (
    <View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 250,
          overflow: "hidden",
          zIndex: 0,
        },
        style,
      ]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={Platform.OS === "web" ? { display: "block" } : undefined}
      >
        <Defs>
          <LinearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <Stop offset="0%" stopColor={gradientColor} />
            <Stop offset="38%" stopColor={gradientColor} />
            <Stop offset="87%" stopColor="#00012B" />
            <Stop offset="100%" stopColor="#00012B" />
          </LinearGradient>

          <ClipPath id={clipId}>
            <Path d="M 0 0 L 100 0 L 100 100 C 75 60, 25 60, 0 100 Z" />
          </ClipPath>
        </Defs>

        <Rect
          width="100"
          height="100"
          fill={`url(#${gradientId})`}
          clipPath={`url(#${clipId})`}
        />
      </Svg>
    </View>
  );
};

// Helper function
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
