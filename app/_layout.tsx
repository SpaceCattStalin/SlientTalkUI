import { Stack, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import './global.css';
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import ThemedView from "@/components/ThemedView";
import { enableExperimentalLayoutAnimation, WalkthroughProvider } from "react-native-interactive-walkthrough";
import { NavProvider } from "@/context/NavContext";
import { Home } from "lucide-react-native";
import MainLayout from "./(main)/_layout";

const RootNavigation = () => {
  const { authState } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
    </Stack>

  );
};


export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavProvider>
          <WalkthroughProvider>
            <RootNavigation />
          </WalkthroughProvider>
        </NavProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

