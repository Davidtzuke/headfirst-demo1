import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, Slot, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

const SIDEBAR_WIDTH = 280;

// Sidebar Menu Component
function SidebarMenu() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Determine active route
  const getActiveIndex = () => {
    if (pathname.includes("/analysis")) return 1;
    if (pathname.includes("/forum")) return 2;
    return 0;
  };

  const activeIndex = getActiveIndex();

  const translateX = useSharedValue(-SIDEBAR_WIDTH);

  useEffect(() => {
    translateX.value = withSpring(isOpen ? 0 : -SIDEBAR_WIDTH, {
      damping: 20,
      stiffness: 300,
      mass: 1,
    });
  }, [isOpen, translateX]);

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const overlayOpacity = useSharedValue(0);

  useEffect(() => {
    overlayOpacity.value = withSpring(isOpen ? 1 : 0, {
      damping: 20,
      stiffness: 300,
    });
  }, [isOpen, overlayOpacity]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    pointerEvents: isOpen ? "auto" : "none",
  }));

  const handleNavigation = (route: string) => {
    router.push(route as any);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          },
          overlayStyle,
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setIsOpen(false)} />
      </Animated.View>

      {/* Sidebar */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            width: SIDEBAR_WIDTH,
            bottom: 0,
            zIndex: 999,
          },
          sidebarStyle,
        ]}
      >
        {Platform.OS === "ios" ? (
          <BlurView
            intensity={80}
            style={{
              flex: 1,
            }}
            tint="dark"
          >
            <View style={{ flex: 1, paddingTop: insets.top }}>
              {/* Header */}
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: "#FFFFFF",
                  }}
                >
                  Menu
                </Text>
              </View>

              {/* Menu Items */}
              <View style={{ paddingTop: 20 }}>
                {tabs.map((tab, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <TouchableOpacity
                      key={tab.name}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        paddingVertical: 16,
                        backgroundColor: isActive
                          ? "rgba(255, 255, 255, 0.1)"
                          : "transparent",
                        borderLeftWidth: isActive ? 3 : 0,
                        borderLeftColor: "#FFC107",
                      }}
                      onPress={() => handleNavigation(tab.route)}
                    >
                      <MaterialCommunityIcons
                        name={tab.icon as any}
                        size={24}
                        color={isActive ? "#FFC107" : "#FFFFFF"}
                        style={{ marginRight: 16 }}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: isActive ? "700" : "500",
                          color: isActive ? "#FFC107" : "#FFFFFF",
                        }}
                      >
                        {tab.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </BlurView>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(2, 0, 3, 0.95)",
              paddingTop: insets.top,
            }}
          >
            {/* Header */}
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#FFFFFF",
                }}
              >
                Menu
              </Text>
            </View>

            {/* Menu Items */}
            <View style={{ paddingTop: 20 }}>
              {tabs.map((tab, index) => {
                const isActive = activeIndex === index;
                return (
                  <TouchableOpacity
                    key={tab.name}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      paddingVertical: 16,
                      backgroundColor: isActive
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                      borderLeftWidth: isActive ? 3 : 0,
                      borderLeftColor: "#FFC107",
                    }}
                    onPress={() => handleNavigation(tab.route)}
                  >
                    <MaterialCommunityIcons
                      name={tab.icon as any}
                      size={24}
                      color={isActive ? "#FFC107" : "#FFFFFF"}
                      style={{ marginRight: 16 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: isActive ? "700" : "500",
                        color: isActive ? "#FFC107" : "#FFFFFF",
                      }}
                    >
                      {tab.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </Animated.View>

      {/* Menu Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: insets.top + 10,
          left: 20,
          zIndex: 1000,
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <MaterialCommunityIcons
          name={isOpen ? "close" : "menu"}
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </>
  );
}

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <SidebarMenu />
    </View>
  );
}
