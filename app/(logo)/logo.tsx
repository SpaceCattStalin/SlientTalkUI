import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '@/global/theme';
import AnimatedTyping from '@/components/animation/AnimatedTyping';
import { useRoute } from '@react-navigation/native';

const Logo = () => {
    const route = useRoute();
    console.log("Currently on route:", route.name);

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <AnimatedTyping textToType={["SilentTalk"]} />
            </View>
        </View >
    );
};

export default Logo;

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