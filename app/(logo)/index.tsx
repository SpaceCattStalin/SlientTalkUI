import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '@/global/theme';
import AnimatedTyping from '@/components/animation/AnimatedTyping';
import { Redirect } from 'expo-router';

const Index = () => {

    useEffect(() => {
        const timer = setTimeout(() => <Redirect href="/(onboarding)/index"></Redirect>, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <AnimatedTyping textToType={["SilentTalk"]} />
            </View>
        </View >
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