import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import './global.css';
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import ThemedView from "@/components/ThemedView";

const RootNavigation = () => {
  const { authState } = useAuth();

  const [showLogo, setShowLogo] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);


  useEffect(() => {
    // Hiển thị logo trong 2 giây
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      // Kiểm tra xem user đã xem onboarding chưa
      const hasSeenOnboarding = false; // logic check từ AsyncStorage
      setShowOnboarding(!hasSeenOnboarding);
    }, 2000);

    return () => clearTimeout(logoTimer);
  }, []);

  // if (showLogo) {
  //   console.log(showLogo);

  //   return (
  //     <Stack screenOptions={{ headerShown: false }}>
  //       <Stack.Screen name="(logo)" />
  //     </Stack>
  //   );
  // }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* {showOnboarding ? (
        <Stack.Screen name="(onboarding)" />
      ) : authState.userToken ? (
        <Stack.Screen name="(main)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )} */}
      <Stack.Screen name="(logo)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );

  // return (
  //   <Stack screenOptions={{ headerShown: false }}>
  //     {/* {!authState.userToken ? ( */}

  //     {/* {authState.userToken ? (
  //       <Stack.Screen name="(auth)/login" />
  //     ) : (
  //       <Stack.Screen name="(main)/home" />
  //     )} */}

  //     <Stack.Screen name="(logo)/index" />

  //     {showOnboarding ?
  //       <Stack.Screen name="(onboarding)/index" /> :
  //       <Stack.Screen name="(main)/home" />
  //     }

  //   </Stack>
  // );
};


export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </AuthProvider>
  );
}

