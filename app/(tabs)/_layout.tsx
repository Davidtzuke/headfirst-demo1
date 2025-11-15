import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import { FloatingTabBar } from "../../components/FloatingTabBar";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <FloatingTabBar />
    </View>
  );
}
