import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LucideHeart } from 'lucide-react-native';

export const APP_ICON_SIZE = 12;

const size = APP_ICON_SIZE * 2;

const AnimatedHeart = Animated.createAnimatedComponent(LucideHeart);

type Props = {
    primary: string,
    accent: string,
    onPress: () => void;
    sizeModifier?: number;
};

const AnimatedLikeIcon = ({ primary, accent, onPress, sizeModifier = 1 }: Props) => {
    const scale = useSharedValue(1);
    const isLiked = useSharedValue(false);
    const [iconColor, setIconColor] = useState(primary);

    const baseSize = APP_ICON_SIZE * 2;
    const iconSize = baseSize * sizeModifier;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePress = () => {
        scale.value = withSpring(
            1.5,
            {
                damping: 2,
                stiffness: 150,
            },
            () => {
                scale.value = withSpring(1);
            },
        );
        isLiked.value = !isLiked.value;
        if (onPress) {
            runOnJS(onPress)();
        }
        runOnJS(setIconColor)(isLiked.value ? primary : accent);
    };


    return (
        <AnimatedHeart
            size={iconSize}
            color={isLiked.value ? accent : primary}
            fill={isLiked.value ? primary : accent}
            style={animatedStyle}
            onPress={handlePress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={isLiked.value ? 'Unlike' : 'Like'}
        />
    );
};

export default AnimatedLikeIcon;