import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, usePathname } from "expo-router";
import React from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";

const tabs = [
  { name: "index", route: "/(tabs)/", title: "Home", icon: "home-outline" },
  {
    name: "analysis",
    route: "/(tabs)/analysis",
    title: "Analysis",
    icon: "chart-box-outline",
  },
  {
    name: "forum",
    route: "/(tabs)/forum",
    title: "Forum",
    icon: "forum-outline",
  },
];

export function FloatingTabBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const tabBarWidth = screenWidth - 40; // 20px padding on each side

  // Determine active route
  const getActiveIndex = () => {
    if (pathname.includes("/analysis")) return 1;
    if (pathname.includes("/forum")) return 2;
    return 0;
  };

  const activeIndex = getActiveIndex();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const TabButton = ({
    tab,
    index,
    isActive,
  }: {
    tab: (typeof tabs)[0];
    index: number;
    isActive: boolean;
  }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <Pressable
        onPress={() => handleNavigation(tab.route)}
        onPressIn={() => {
          scale.value = withSpring(0.85, {
            damping: 15,
            stiffness: 300,
          });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 300,
          });
        }}
        style={styles.tabButton}
      >
        <Animated.View style={[styles.tabButtonContent, animatedStyle]}>
          <MaterialCommunityIcons
            name={tab.icon as any}
            size={24}
            color={isActive ? Colors.primary : Colors.icon}
          />
          {isActive && <View style={styles.activeIndicator} />}
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {Platform.OS === "ios" ? (
        <BlurView
          intensity={80}
          style={[styles.blurContainer, { width: tabBarWidth }]}
          tint="dark"
        >
          <View style={styles.tabBar}>
            {tabs.map((tab, index) => (
              <TabButton
                key={tab.name}
                tab={tab}
                index={index}
                isActive={activeIndex === index}
              />
            ))}
          </View>
        </BlurView>
      ) : (
        <View
          style={[
            styles.blurContainer,
            styles.androidContainer,
            { width: tabBarWidth },
          ]}
        >
          <View style={styles.tabBar}>
            {tabs.map((tab, index) => (
              <TabButton
                key={tab.name}
                tab={tab}
                index={index}
                isActive={activeIndex === index}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 1000,
    alignItems: "center",
  },
  blurContainer: {
    borderRadius: 48,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  androidContainer: {
    backgroundColor: "rgba(2, 0, 3, 0.95)",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 60,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: 40,
    height: 40,
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});
