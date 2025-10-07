import NavBar from '@/components/NavBar';
import Search from '@/components/Searchbar';
import { colors, fontSizes, spacing } from '@/global/theme';
import { ChevronRight } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddCollectionModal from '@/components/AddModal';
import AnimatedLikeIcon from '@/components/animation/AnimatedLikeIcon';
import CollectionModal from '@/components/CollectionModal';
import ResultModal from '@/components/ResultModal';
import { Collection } from '@/types/Types';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInLeft, FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import TwoLine from '@/assets/images/two_lines.svg';
import DictionarySearchOverlay from '@/components/walkthrough/DictionaryScreenOverlay';
import DictionarySaveOverlay from '@/components/walkthrough/DictionaryScreenOverlay3';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import DictionaryCategoryOverlay from '../components/walkthrough/DictionaryScreenOverlay2';

import { useSelector } from 'react-redux';
import { RootState } from '../services/store';

const categories = ["Triệu chứng", "Bộ phận cơ thể", "Điều trị", "Trường học"];

const collections: Collection[] = [
    { id: 'randomstring', name: 'Tất cả từ đã lưu', wordCount: 12 },
    // { id: 'randomstring1', name: 'Y tế', wordCount: 4 },
    // { id: 'randomstring3', name: 'fafa', wordCount: 4 },
];

const dictionary = [
    "Bố", "Mẹ", "Banh", "Cô", "Kẹo",
    "Anh", "Chị", "Em", "Ông", "Bà",
    "Cơm", "Nước", "Sữa", "Bánh mì", "Táo",
    "Thầy", "Cô giáo", "Bạn", "Sách", "Bút",
    "Xin chào", "Cảm ơn", "Xin lỗi", "Có", "Không"
];

const Dictionary = () => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const [isCollectionVisible, setIsCollectionVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [resultState, setResultState] = useState<"add" | "save">("save");
    const scale = useSharedValue(1);


    const canStartWalkthrough = useSelector(
        (state: RootState) => state.walkthrough.canStartWalkthrough
    );

    const { onLayout: step11OnLayout, goTo: goTo11, start: startStep11 } = useWalkthroughStep({
        number: 11,
        fullScreen: false,
        OverlayComponent: DictionarySearchOverlay,
    });

    const { onLayout: step12OnLayout } = useWalkthroughStep({
        number: 12,
        fullScreen: false,
        OverlayComponent: DictionaryCategoryOverlay,
    });

    const { onLayout: step13OnLayout } = useWalkthroughStep({
        number: 13,
        fullScreen: false,
        maskAllowInteraction: true,
        OverlayComponent: DictionarySaveOverlay,
    });

    useEffect(() => {
        if (query.length > 0) {
            const filtered = dictionary.filter((word) =>
                word.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        if (canStartWalkthrough)
            goTo11(11);
    }, [startStep11, goTo11, canStartWalkthrough]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <SafeAreaView style={styles.container}>
                {/* <Header /> */}
                <View style={{ flex: 1 }}>
                    <Animated.View
                        style={styles.searchContainer}
                        entering={FadeInLeft.duration(500).springify()}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text
                                style={{
                                    paddingHorizontal: spacing.md,
                                    fontSize: fontSizes['2xl'],
                                    fontWeight: 700,
                                    color: colors.gray50
                                }}>
                                Bạn cần kiếm ký hiệu gì?
                            </Text>

                            <Pressable
                                onPressIn={() => { scale.value = withSpring(0.95); }}
                                onPressOut={() => { scale.value = withSpring(1); }}
                                onPress={() => router.push('./collections')}
                            >
                                <Animated.View style={[
                                    styles.buttonStyle,
                                    animatedStyle]}
                                    onLayout={step13OnLayout}
                                >
                                    <TwoLine height={20} width={20} preserveAspectRatio="xMidYMid meet" />
                                </Animated.View>
                            </Pressable>
                        </View>
                        <Animated.View
                            onLayout={step11OnLayout}
                            entering={FadeInLeft.delay(200).duration(500).springify()}
                        >
                            <Search value={query} onChange={setQuery} />
                        </Animated.View>
                        {/* <FlatList
                        style={{ alignSelf: 'auto', padding: spacing.sm }}
                        horizontal
                        data={categories}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.categoryCard}>
                                <Text style={{ fontSize: fontSizes.sm }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                    /> */}

                        {/* 
                    <View style={{
                        paddingHorizontal: spacing.md,
                    }}>

                        <Text style={{ fontSize: fontSizes.xl, fontWeight: 700, color: colors.gray50 }}>hay...</Text>
               
                        <CTAButton />
                    </View> */}
                    </Animated.View>

                    <View style={styles.main}>
                        {query ? (
                            results.length > 0 ? (
                                <View
                                    style={{
                                        marginTop: spacing.lg,
                                        paddingHorizontal: spacing.md
                                    }}
                                >
                                    <FlatList
                                        style={{ marginTop: 10 }}
                                        data={results}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item, index }) => (
                                            <Animated.View
                                                entering={FadeInUp.delay(100 * index).duration(200)}
                                                style={styles.card}
                                            >
                                                <TouchableOpacity
                                                    style={styles.searchItem}
                                                    onPress={() => {
                                                        // router.push(`./word/${item}`);
                                                        router.push(`./word/${encodeURIComponent(item)}`);
                                                    }}
                                                >
                                                    <Text style={{
                                                        fontSize: fontSizes.lg,
                                                        color: colors.primary600,
                                                        fontWeight: 500
                                                    }}>
                                                        {item}
                                                    </Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        gap: spacing.xs,
                                                        alignItems: 'center'
                                                    }}>
                                                        <AnimatedLikeIcon
                                                            accent='transparent'
                                                            primary={colors.primary600}
                                                            onPress={() => setIsCollectionVisible(true)}
                                                        />
                                                        <ChevronRight
                                                            color={colors.primary700}
                                                            size={28}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </Animated.View>
                                        )}
                                    />
                                </View>
                            ) : <View style={{ flex: 1, gap: spacing.md }}>
                                <Image source={require('@/assets/images/empty.png')}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        alignSelf: 'center',
                                        resizeMode: 'contain',
                                        marginTop: spacing.lg
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: fontSizes.lg,
                                        color: colors.gray400,
                                        textAlign: 'center',
                                    }}>
                                    Không tìm thấy kết quả cho &quot;{query}&quot;
                                </Text>
                            </View>
                        ) : (
                            <View
                                style={{ flex: 1, gap: spacing.md, justifyContent: 'flex-start' }}
                            >
                                <Animated.View
                                    entering={FadeInDown.delay(300).duration(500).springify()}
                                >
                                    <Text style={{
                                        textAlign: 'center',
                                        color: colors.primary700,
                                        fontSize: fontSizes['2xl'],
                                        fontWeight: 700,
                                        marginTop: spacing.lg,
                                    }}>
                                        Khám phá theo chủ đề
                                    </Text>
                                </Animated.View>

                                <View style={styles.topicsContainer}>
                                    <Animated.View
                                        style={styles.topicContainer}
                                        entering={FadeInDown.delay(400).duration(500).springify()}
                                        onLayout={step12OnLayout}
                                    >
                                        <TouchableOpacity style={styles.topic}
                                            onPress={() => {
                                                // router.push('./family');
                                                router.push(`./${encodeURIComponent("Gia đình")}`);
                                            }}
                                        >
                                            <View style={styles.topicImage}>
                                                <Image
                                                    source={require('@/assets/images/family.png')}
                                                    style={styles.image}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                            <Text style={styles.topicTitle}>Gia đình</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.topic}
                                            onPress={() => {
                                                router.push(`./${encodeURIComponent("Y tế")}`);
                                            }}
                                        >
                                            <View style={styles.topicImage}>
                                                <Image
                                                    source={require('@/assets/images/doctor.png')}
                                                    style={styles.image}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                            <Text style={styles.topicTitle}>Y tế</Text>
                                        </TouchableOpacity>
                                    </Animated.View>

                                    <Animated.View
                                        style={styles.topicContainer}
                                        entering={FadeInDown.delay(500).duration(500).springify()}
                                    >
                                        <TouchableOpacity
                                            style={styles.topic}
                                            onPress={() => {
                                                router.push(`./${encodeURIComponent("Trường học")}`);
                                            }}
                                        >
                                            <View style={styles.topicImage}>
                                                <Image
                                                    source={require('@/assets/images/school.png')}
                                                    style={styles.image}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                            <Text style={styles.topicTitle}>Trường học</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.topic}
                                            onPress={() => {
                                                router.push(`./${encodeURIComponent("Câu hỏi")}`);
                                            }}
                                        >
                                            <View style={styles.topicImage}>
                                                <Image
                                                    source={require('@/assets/images/question.png')}
                                                    style={styles.image}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                            <Text style={styles.topicTitle}>Câu hỏi</Text>
                                        </TouchableOpacity>
                                    </Animated.View>
                                </View>
                            </View>)}
                    </View>
                    <NavBar />
                </View>
                <ResultModal
                    visible={isResultVisible}
                    onClose={() => setIsResultVisible(false)}
                    state={resultState}
                />

                <CollectionModal
                    inDictionary={true}
                    isVisible={isCollectionVisible}
                    onCancel={() => setIsCollectionVisible(false)}
                    collections={collections}
                    onConfirm={() => {
                        setIsCollectionVisible(false);
                        setResultState("save");
                        setIsResultVisible(true);
                    }}
                    onAdd={() => {
                        setIsCollectionVisible(false);
                        setIsAddModalVisible(true);
                    }}
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
        </KeyboardAvoidingView >
    );
};

export default Dictionary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C6AEF"
    },
    searchContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
        marginBottom: spacing.md
    },
    buttonStyle: {
        alignItems: 'center',
        padding: spacing.sm * 1.2,
        borderRadius: 5,
        backgroundColor: '#4B7FF2',
        alignSelf: 'center',
        marginRight: spacing.sm,
    },
    main: {
        //flex: 3,
        flex: 4,
        borderRadius: 60,
        backgroundColor: colors.gray50,
        // gray50: #FDFDFE
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,
        gap: spacing.lg
    },
    topicsContainer: {
        paddingHorizontal: spacing.md,
        flex: 1,
        gap: spacing.md,
        // backgroundColor: 'red'
    },
    topicContainer: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        gap: spacing.lg,

    },
    topic: {
        flex: 0.5,
        borderRadius: spacing.md,
        // padding: spacing.md,
        paddingBottom: spacing.sm,
        // backgroundColor: '#E0F2FE'
        backgroundColor: 'white',
        borderColor: colors.gray300,
        borderWidth: 2,

    },
    topicImage: {
        width: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    topicTitle: {
        textAlign: 'center',
        fontSize: fontSizes.md,
        fontWeight: 600,
        color: colors.primary600
    },
    categoryCard: {
        borderWidth: 1,
        flexShrink: 1,
        borderColor: colors.gray400,
        backgroundColor: colors.gray200,
        borderRadius: 5,
        alignSelf: 'flex-start',
        padding: spacing.sm
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