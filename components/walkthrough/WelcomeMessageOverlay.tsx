import { colors, fontSizes, spacing } from '@/global/theme';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedTyping from '../animation/AnimatedTyping';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { setCanStartWalkthrough } from '../../context/WalkthroughSlice';

const WelcomeMessageOverlay = ({ next, stop }: IOverlayComponentProps) => {
    // const canStartWalkthrough = useSelector((state: RootState) => state.walkthrough.canStartWalkthrough);
    // const dispatch = useDispatch<AppDispatch>();

    const scaleStart = useSharedValue(1);
    const scaleSkip = useSharedValue(1);

    const animatedStyleStart = useAnimatedStyle(() => ({
        transform: [{ scale: scaleStart.value }],
    }));

    const animatedStyleSkip = useAnimatedStyle(() => ({
        transform: [{ scale: scaleSkip.value }],
    }));

    const handleEnd = () => {
        //dispatch(setCanStartWalkthrough(false));
        stop();
    };
    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <View style={styles.overlayBackground} />
            <View style={{ paddingHorizontal: spacing.md * 2, paddingVertical: spacing.lg }}>
                <AnimatedTyping
                    textToType={["Chào mừng bạn đến với Silent Talk!"]}
                    displayLogo={false}
                />
            </View>

            <Animated.View
                style={{ paddingHorizontal: spacing.md * 2 }}
                entering={FadeInDown.delay(3000).duration(500).springify()}
            >
                <Text style={styles.subtitle}>
                    Hãy cùng khám phá nhanh các tính năng chính của ứng dụng nhé.
                </Text>
            </Animated.View>


            <Animated.View
                style={{ flexDirection: 'row', justifyContent: 'center', marginTop: spacing.md }}
                entering={FadeInDown.delay(3500).duration(500).springify()}
            >

                <Pressable
                    onPressIn={() => { scaleSkip.value = withSpring(0.95); }}
                    onPressOut={() => { scaleSkip.value = withSpring(1); }}
                    onPress={handleEnd}
                    style={{ marginHorizontal: spacing.sm }}
                >
                    <Animated.View style={[styles.button, { backgroundColor: colors.gray400 }, animatedStyleSkip]}>
                        <Text style={[styles.buttonText, { color: colors.gray700 }]}>Bỏ qua</Text>
                    </Animated.View>
                </Pressable>

                <Pressable
                    onPressIn={() => { scaleStart.value = withSpring(0.95); }}
                    onPressOut={() => { scaleStart.value = withSpring(1); }}
                    onPress={next}
                    style={{ marginHorizontal: spacing.sm }}
                >
                    <Animated.View style={[styles.button, animatedStyleStart]}>
                        <Text style={styles.buttonText}>Bắt đầu</Text>
                    </Animated.View>
                </Pressable>
            </Animated.View>
        </SafeAreaView>
    );
};

export default WelcomeMessageOverlay;
const styles = StyleSheet.create({
    fullScreenContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
    },
    overlayBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: colors.gray400,
        marginBottom: 20,
        lineHeight: 22,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 16,
        alignItems: "center",
        backgroundColor: "#2C6AEF",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});