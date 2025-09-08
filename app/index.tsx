import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, TextInput, View } from 'react-native';
import Logo from "./(logo)/logo";
import Onboarding from "./(onboarding)/onboarding";


export default function Index() {
    const { authState } = useAuth();

    const [showLogo, setShowLogo] = useState(true);

    const [showOnboarding, setShowOnboarding] = useState(true);

    useEffect(() => {
        const logoTimer = setTimeout(() => {
            setShowLogo(false);
            const hasSeenOnboarding = false;
            setShowOnboarding(!hasSeenOnboarding);
        }, 2000);

        return () => clearTimeout(logoTimer);
    }, []);

    // if (showLogo) {
    //     return (
    //         <Logo />
    //     );
    // }

    // if (showOnboarding) {
    //     return <Onboarding onDone={() => setShowOnboarding(false)} />;
    // }
    return (
        <View className="bg-red-500 flex-1">
            {/* {authState.userToken ? ( */}
            {true ? (
                <Redirect href="/(main)/home" />
            ) : (
                <Redirect href="/(auth)/login" />
            )}
        </View>
    );
}
