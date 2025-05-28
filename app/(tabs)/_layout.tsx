import { Feather, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";

import React from "react";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarBackground: () => (
          <BlurView
            intensity={90}
            style={{ ...StyleSheet.absoluteFillObject }}
          />
        ),
        tabBarStyle: {
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#1d405d",
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="home"
                size={24}
                color={focused ? "#1d405d" : "gray"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#1d405d",
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="favorite-border"
                size={24}
                color={focused ? "#1d405d" : "gray"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
