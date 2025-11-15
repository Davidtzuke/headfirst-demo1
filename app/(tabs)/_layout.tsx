import { Drawer } from "expo-router/drawer";
import React from "react";

import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.tint,
        drawerInactiveTintColor: Colors.tabIconDefault,
        drawerStyle: {
          backgroundColor: Colors.tabBarBackground,
          width: 280,
        },
        drawerContentStyle: {
          backgroundColor: Colors.tabBarBackground,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="analysis"
        options={{
          title: "Analysis",
          drawerIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons
              name="chart-box-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="forum"
        options={{
          title: "Forum",
          drawerIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Drawer>
  );
}
