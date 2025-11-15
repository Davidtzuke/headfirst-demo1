import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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
  const iconButtonWidth = 60; // Width of icon button container
  const gap = 10; // Gap between tab bar and icon button
  const tabBarWidth = screenWidth - 40 - iconButtonWidth - gap; // Account for padding, icon button, and gap
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuOpacity = useSharedValue(0);
  const menuScale = useSharedValue(0.8);
  const menuTranslateY = useSharedValue(10);
  const plusRotation = useSharedValue(0);

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

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    if (newState) {
      menuOpacity.value = withTiming(1, { duration: 200 });
      menuScale.value = withTiming(1, { duration: 200 });
      menuTranslateY.value = withTiming(0, { duration: 200 });
      plusRotation.value = withTiming(45, { duration: 200 });
    } else {
      menuOpacity.value = withTiming(0, { duration: 150 });
      menuScale.value = withTiming(0.8, { duration: 150 });
      menuTranslateY.value = withTiming(10, { duration: 150 });
      plusRotation.value = withTiming(0, { duration: 150 });
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuOpacity.value = withTiming(0, { duration: 150 });
    menuScale.value = withTiming(0.8, { duration: 150 });
    menuTranslateY.value = withTiming(10, { duration: 150 });
    plusRotation.value = withTiming(0, { duration: 150 });
  };

  const handleMenuButton1 = () => {
    closeMenu();
    // Add your action here

    console.log("Menu button 1 pressed");
  };

  const handleMenuButton2 = () => {
    closeMenu();
    // Add your action here
    handleNavigation("/(tabs)/chatbot")
    console.log("Menu button 2 pressed");
  };

  const PlusButton = () => {
    const scale = useSharedValue(1);

    const buttonAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { rotate: `${plusRotation.value}deg` },
      ],
    }));

    return (
      <Pressable
        onPress={toggleMenu}
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
        style={styles.plusButton}
      >
        <Animated.View style={[styles.plusButtonContent, buttonAnimatedStyle]}>
          <MaterialCommunityIcons name="plus" size={24} color={Colors.icon} />
        </Animated.View>
      </Pressable>
    );
  };

  const MenuButton = ({
    icon,
    onPress,
  }: {
    icon: string;
    onPress: () => void;
  }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <Pressable
        onPress={onPress}
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
        style={styles.menuButton}
      >
        <Animated.View style={[styles.menuButtonContent, animatedStyle]}>
          <MaterialCommunityIcons
            name={icon as any}
            size={24}
            color={Colors.icon}
          />
        </Animated.View>
      </Pressable>
    );
  };

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    transform: [
      { scale: menuScale.value },
      { translateY: menuTranslateY.value },
    ],
    pointerEvents: menuOpacity.value > 0 ? "auto" : "none",
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    pointerEvents: menuOpacity.value > 0 ? "auto" : "none",
  }));

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={closeMenu}
        />
      </Animated.View>
      <View
        style={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom, 20),
          },
        ]}
      >
        <View style={styles.tabBarContainer}>
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

          <View style={styles.plusButtonContainer}>
            {/* Menu */}
            <Animated.View style={[styles.menuContainer, menuAnimatedStyle]}>
              {Platform.OS === "ios" ? (
                <BlurView intensity={80} style={styles.menuBlur} tint="dark">
                  <View style={styles.menuStack}>
                    <MenuButton
                      icon="notebook-outline"
                      onPress={handleMenuButton1}
                    />
                    <MenuButton
                      icon="thought-bubble-outline"
                      onPress={handleMenuButton2}
                    />
                  </View>
                </BlurView>
              ) : (
                <View style={[styles.menuBlur, styles.androidContainer]}>
                  <View style={styles.menuStack}>
                    <MenuButton
                      icon="bell-outline"
                      onPress={handleMenuButton1}
                    />
                    <MenuButton
                      icon="thought-bubble-outline"
                      onPress={handleMenuButton2}
                    />
                  </View>
                </View>
              )}
            </Animated.View>

            {/* Plus Button */}
            {Platform.OS === "ios" ? (
              <BlurView
                intensity={80}
                style={styles.plusButtonBlur}
                tint="dark"
              >
                <PlusButton />
              </BlurView>
            ) : (
              <View style={[styles.plusButtonBlur, styles.androidContainer]}>
                <PlusButton />
              </View>
            )}
          </View>
        </View>
      </View>
    </>
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
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 999,
  },
  plusButtonContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonBlur: {
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
    width: 64,
    height: 64,
  },
  plusButton: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  menuContainer: {
    position: "absolute",
    bottom: 78,
    alignItems: "center",
    justifyContent: "center",
  },
  menuBlur: {
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
  menuStack: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  menuButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
  },
});
