import { Slot } from "expo-router";
import React, { useState, useEffect } from "react";
import { Platform, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { router, usePathname } from "expo-router";

import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const tabs = [
  { name: "index", route: "/(tabs)/", title: "Home", icon: "home-outline" },
  { name: "analysis", route: "/(tabs)/analysis", title: "Analysis", icon: "chart-box-outline" },
  { name: "forum", route: "/(tabs)/forum", title: "Forum", icon: "forum-outline" },
];

// Custom Tab Bar Component
function CustomTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / tabs.length;

  // Add state to force re-renders
  const [currentTab, setCurrentTab] = useState(0);

  // Determine active index based on current route
  let activeIndex = 0; // Default to home
  if (pathname.includes("/analysis")) {
    activeIndex = 1;
  } else if (pathname.includes("/forum")) {
    activeIndex = 2;
  }

  // Update current tab state when route changes
  useEffect(() => {
    setCurrentTab(activeIndex);
  }, [activeIndex]);

  const translateX = useSharedValue(activeIndex * tabWidth);

  useEffect(() => {
    translateX.value = withSpring(currentTab * tabWidth, {
      damping: 20,
      stiffness: 300,
      mass: 1,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    });
  }, [currentTab, tabWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + tabWidth / 2 - 32 }],
  }));

  const tabBarHeight = Platform.OS === "ios" ? 100 : 80;

  return (
    <>
      {/* Extended gradient overlay that goes above the tab bar */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: tabBarHeight + 80,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(0, 0, 0, 0.02)",
            "rgba(0, 0, 0, 0.05)",
            "rgba(0, 0, 0, 0.1)",
            "rgba(0, 0, 0, 0.2)",
            "rgba(0, 0, 0, 0.4)",
            "rgba(0, 0, 0, 0.7)",
            "rgba(0, 0, 0, 0.9)"
          ]}
          style={{ flex: 1 }}
          locations={[0, 0.1, 0.2, 0.35, 0.5, 0.7, 0.85, 1]}
        />
      </View>

      {/* Tab Bar Container */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: tabBarHeight,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : 12,
          paddingTop: 12,
          zIndex: 10,
        }}
      >
        {/* Blur Background */}
        {Platform.OS === "ios" ? (
          <BlurView
            intensity={80}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            tint="dark"
          />
        ) : (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(2, 0, 3, 0.9)",
            }}
          />
        )}

        {/* Tab Indicator */}
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 8,
              width: 64,
              height: 64,
              zIndex: 10,
            },
            animatedStyle,
          ]}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "transparent",
              shadowColor: "rgba(255, 193, 7, 1)",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 20,
              elevation: 15,
            }}
          />
        </Animated.View>

        {/* Tab Items */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 0,
            zIndex: 5,
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = currentTab === index;
            return (
              <TouchableOpacity
                key={tab.name}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 6,
                }}
                onPress={() => {
                  setCurrentTab(index);
                  router.push(tab.route);
                }}
              >
                <MaterialCommunityIcons
                  name={tab.icon as any}
                  size={24}
                  color={isActive ? "#FFFFFF" : "#6B7280"}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? "700" : "500",
                    color: isActive ? "#FFFFFF" : "#6B7280",
                    marginTop: 2,
                  }}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
}

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <CustomTabBar />
    </View>
  );
}
