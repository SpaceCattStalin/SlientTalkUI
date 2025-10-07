import AnimatedTyping from '@/components/animation/AnimatedTyping';
import { colors } from '@/global/theme';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Onboarding from './onboarding';

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
                <AnimatedTyping textToType={["SilentTalk"]} displayLogo={true} />
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