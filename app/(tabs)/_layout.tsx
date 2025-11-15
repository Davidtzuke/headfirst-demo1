import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import { FloatingTabBar } from "../../components/FloatingTabBar";
import { Header } from "../../components/Header";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Slot />
      <FloatingTabBar />
    </View>
  );
}
