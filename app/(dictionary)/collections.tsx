import AddCollectionModal from '@/components/AddModal';
import BackButton from '@/components/BackButton';
import NavBar from '@/components/NavBar';
import ResultModal from '@/components/ResultModal';
import CollectionScreenOverlay from '@/components/walkthrough/CollectionScreenOverlay';
import { useNav } from '@/context/NavContext';
import { colors, fontSizes, spacing } from '@/global/theme';
import { Collection } from '@/types/Types';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import Animated, { FadeInLeft, FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const collections: Collection[] = [
    { id: 'randomstring', name: 'Tất cả từ đã lưu', wordCount: 12 },
    // { id: 'randomstring1', name: 'Y tế', wordCount: 4, tag: 'y_te' },
    // { id: 'randomstring3', name: 'fafa', wordCount: 6, tag: 'fafa' },
];

const Collections = () => {
    const { activeTab, setActiveTab } = useNav();

    const [isCollectionVisible, setIsCollectionVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [resultState, setResultState] = useState<"add" | "save">("save");

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    const { onLayout: step13OnLayout, goTo, start, next } = useWalkthroughStep({
        number: 14,
        fullScreen: false,
        OverlayComponent: CollectionScreenOverlay,
        maskAllowInteraction: true
    });

/*     useEffect(() => {
        goTo(14);
    }, [goTo, start]); */

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <View style={{
                        paddingHorizontal: spacing.md,
                        marginTop: spacing.lg,
                        alignSelf: 'center'
                    }}>
                        <BackButton color={colors.gray50} />
                    </View>
                </View>

                <Animated.View
                    style={styles.searchContainer}
                    entering={FadeInLeft.duration(500).springify()}
                >
                    <Text
                        style={{
                            paddingHorizontal: spacing.md,
                            fontSize: fontSizes['2xl'],
                            fontWeight: 700,
                            color: colors.gray50
                        }}>
                        Ký hiệu đã lưu
                    </Text>
                    <Pressable
                        onPressIn={() => { scale.value = withSpring(0.95); }}
                        onPressOut={() => { scale.value = withSpring(1); }}
                        style={{ paddingHorizontal: spacing.md, marginTop: spacing.md * 1.4 }}
                        onPress={() => setIsAddModalVisible(true)}
                    >

                        <Animated.View style={[
                            styles.buttonStyle,
                            animatedStyle]}
                        >
                            <Text style={[styles.addNewText]}>
                                + Tạo bộ sưu tập mới
                            </Text>
                        </Animated.View>
                    </Pressable>
                </Animated.View>

                <View style={styles.main}>
                    <FlatList
                        style={{
                            marginTop: 20,
                            marginHorizontal: spacing.lg,
                        }}
                        data={collections}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <Animated.View
                                onLayout={index === 0 ? step13OnLayout : undefined}
                                entering={FadeInUp.delay(100 * index).duration(200)}
                                style={styles.card}
                            >
                                <TouchableOpacity
                                    style={styles.searchItem}
                                    onPress={() => {
                                        next();
                                        router.push(`./collection/${encodeURIComponent(item.tag ?? 'default')}
                                        ?name=${encodeURIComponent(item.name)}`);
                                    }}
                                >
                                    <Text style={{
                                        fontSize: fontSizes.lg,
                                        color: colors.primary600,
                                        fontWeight: 500,
                                        textAlign: 'center',
                                        flex: 1,
                                    }}>
                                        {item.name} ({item.wordCount} từ)
                                    </Text>

                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    />
                </View>
                <NavBar />
            </View>

            <ResultModal
                visible={isResultVisible}
                onClose={() => setIsResultVisible(false)}
                state={resultState}
            />

            <AddCollectionModal
                isVisible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                onAdd={() => {
                    setIsAddModalVisible(false);
                    setResultState("add");
                    setIsResultVisible(true);
                }}
            />
        </SafeAreaView>
    );
};

export default Collections;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C6AEF"
    },
    searchContainer: {
        flex: 1,
        paddingHorizontal: spacing.sm,
        marginTop: spacing.sm
    },
    main: {
        //flex: 3,
        flex: 5,
        borderRadius: 60,
        backgroundColor: colors.gray50,
        // gray50: #FDFDFE
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,
        gap: spacing.lg
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: spacing.sm,
        borderRadius: 5,
        backgroundColor: '#4B7FF2',
        borderWidth: 1,
        marginBottom: spacing.sm,
        borderStyle: "dashed",
        borderColor: colors.gray400,
    },
    addNewText: {
        textAlign: "center",
        color: colors.gray100,
        fontWeight: "bold",
        fontSize: fontSizes.md,
        zIndex: 999,
    },
    card: {
        backgroundColor: colors.gray50,
        borderRadius: 10,
        borderWidth: .5,
        borderColor: colors.gray400,
        marginBottom: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 2,
    },
    searchItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.md,

    }
});