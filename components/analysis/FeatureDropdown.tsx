import { useState } from "react";
import FeatureGraphDropdown from "./FeatureGraph";

// --------------------------------------------
// Utility
// --------------------------------------------
const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(max, x));

const randomGaussian = (mean = 0, stdev = 1) => {
  // Box-Muller transform
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return (
    mean + stdev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  );
};

// Generates dates Feb 1 → Feb 29, 2024
const generateDateRange = () => {
  const dates: Date[] = [];
  const start = new Date("2024-02-01");
  const end = new Date("2024-02-29");

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
};

export type DataPoint = { date: Date; value: number };

// --------------------------------------------
// Realistic Generators
// --------------------------------------------

// Altitude: Usually stable unless user moves around a lot.
// We simulate small drift + occasional trip.
export const generateAltitude = (): DataPoint[] => {
  const dates = generateDateRange();
  let altitude = randomGaussian(300, 50); // base altitude

  return dates.map((date) => {
    altitude += randomGaussian(0, 8); // small daily drift
    if (Math.random() < 0.03) altitude += randomGaussian(400, 150); // "hike/trip"
    return {
      date,
      value: clamp(altitude, -100, 5000),
    };
  });
};

// Atmospheric pressure: slow moving with weather systems.
export const generatePressure = (): DataPoint[] => {
  const dates = generateDateRange();
  let pressure = randomGaussian(1015, 8); // base around typical weather pressure

  return dates.map((date) => {
    pressure += randomGaussian(0, 5); // daily fluctuations
    return {
      date,
      value: clamp(pressure, 100, 1500),
    };
  });
};

// Temperature: realistic winter → early spring climb.
export const generateTemperature = (): DataPoint[] => {
  const dates = generateDateRange();
  return dates.map((date, i) => {
    const seasonalRise = i * 0.2; // Feb warmer than Jan
    const baseWinter = -5 + seasonalRise;
    const noise = randomGaussian(0, 3);
    return {
      date,
      value: clamp(baseWinter + noise, -35, 50),
    };
  });
};

// Steps: weekday/weekend pattern + randomness.
export const generateSteps = (): DataPoint[] => {
  const dates = generateDateRange();
  return dates.map((date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;

    const base = isWeekend ? 9000 : 12000; // weekend lower
    const noise = randomGaussian(0, 4000);

    return {
      date,
      value: clamp(base + noise, 0, 30000),
    };
  });
};

// Avg Steps: smoother, rolling 7-day average
export const generateAvgSteps = (steps: DataPoint[]): DataPoint[] => {
  let avg = 10000; // start
  return steps.map((s, i) => {
    avg = avg * 0.9 + s.value * 0.1; // exponential smoothing
    return {
      date: s.date,
      value: clamp(avg, 0, 30000),
    };
  });
};

// Steps ratio: realistic ratio
export const generateStepsRatio = (steps: DataPoint[], avgSteps: DataPoint[]) =>
  steps.map((s, i) => ({
    date: s.date,
    value: avgSteps[i].value ? s.value / avgSteps[i].value : 0,
  }));

// Screen brightness: higher on weekdays, lower on weekends, noise
export const generateBrightness = (): DataPoint[] => {
  const dates = generateDateRange();
  return dates.map((date) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const base = isWeekend ? 6 : 9;
    const noise = randomGaussian(0, 2);
    return {
      date,
      value: clamp(Math.round(base + noise), 0, 15),
    };
  });
};

// Night light / Blue light filter: more active on weekdays, consistent pattern
export const generateNightLight = (): DataPoint[] => {
  const dates = generateDateRange();
  return dates.map((date) => {
    const base = 4 + Math.sin(date.getTime() / (1000 * 3600 * 24 * 7)) * 2; // weekly wave
    const noise = randomGaussian(0, 1.5);
    return {
      date,
      value: clamp(Math.round(base + noise), 0, 15),
    };
  });
};

// --------------------------------------------
// Combined Generator
// --------------------------------------------
export const generateAllMetrics = (): Record<string, DataPoint[]> => {
  const altitude = generateAltitude();
  const pressure = generatePressure();
  const temperature = generateTemperature();
  const steps = generateSteps();
  const avgSteps = generateAvgSteps(steps);
  const brightness = generateBrightness();
  const nightLight = generateNightLight();

  return {
    altitude,
    pressure,
    temperature,
    steps,
    avgSteps,
    brightness,
    nightLight,
  };
};

const data = generateAllMetrics();

const FeatureDropdown = () => {
  const [feature, setFeature] = useState<string>("steps");

  return (
    <FeatureGraphDropdown
      title={feature.charAt(0).toUpperCase() + feature.slice(1)}
      data={data[feature]}
      height={300}
      showGrid={true}
    />
  );
};

export default FeatureDropdown;
