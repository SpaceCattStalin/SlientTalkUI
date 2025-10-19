import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '@/global/theme';
import AnimatedTyping from '@/components/animation/AnimatedTyping';
import { useRoute } from '@react-navigation/native';
import { Redirect, router } from 'expo-router';
import Onboarding from './(onboarding)/onboarding';
import TestRender from '../components/animation/testRender';
import ModelViewer from '../components/animation/ModelViewer';

type Prop = {
    onDone: () => void;
};

const Index = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [readyToRedirect, setReadyToRedirect] = useState(false);
    const [splashDone, setSplashDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashDone(true);

            const hasSeenOnboarding = false;

            if (hasSeenOnboarding) {
                setReadyToRedirect(true);
            } else {
                setShowOnboarding(true);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (showOnboarding) {
        return (
            <Onboarding onDone={() => {
                setShowOnboarding(false);
                setReadyToRedirect(true);
            }} />

            // <TestRender/>
        );
    }

    if (readyToRedirect) {
        return <Redirect href="/home" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <AnimatedTyping textToType={["SilenTalk"]} displayLogo={true} />
            </View>
            {/* <Redirect href="/(auth)/login" />; */}
        </View>
    );
};


export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary300,
        justifyContent: 'center'
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6
    }
});