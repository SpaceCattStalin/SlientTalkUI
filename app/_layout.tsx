import { Stack, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import './global.css';
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import ThemedView from "@/components/ThemedView";
import NavBar from "@/components/NavBar";
import { NavProvider } from "@/context/NavContext";

const RootNavigation = () => {
  const { authState } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(logo)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(main)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(dictionary)" />
      <Stack.Screen name="(practice)" />
    </Stack>
  );
};


export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavProvider>
          <RootNavigation />
        </NavProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

