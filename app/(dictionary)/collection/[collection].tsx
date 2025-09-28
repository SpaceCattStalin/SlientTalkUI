import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors, fontSizes, spacing } from '@/global/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';
import Animated, { FadeInLeft, FadeInUp, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { usePathname, useSearchParams } from 'expo-router/build/hooks';
import NavBar from '@/components/NavBar';
import Search from '@/components/Searchbar';
import { Collection } from '@/types/Types';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import ThreeDots from '@/assets/images/three_dots.svg';
import WordOptionModal from '@/components/WordOptionModal';
import CollectionModal from '@/components/CollectionModal';
import ResultModal from '@/components/ResultModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

const collectionDictionary: Record<string, string[]> = {
    "Tất cả từ đã lưu": [
        "Bố", "Mẹ", "Anh", "Chị", "Em", "Ông", "Bà", "Con", "Cháu",
        "Vợ", "Chồng", "Cô", "Dì", "Chú", "Bác", "Anh họ", "Chị họ",
        "Bác sĩ", "Y tá", "Thuốc", "Bệnh viện", "Khám bệnh",
        "Thầy", "Cô giáo", "Bạn", "Sách", "Bút", "Bảng", "Vở", "Lớp học",
        "Xin chào", "Cảm ơn", "Xin lỗi", "Có", "Không"
    ],
    "Y tế": [
        "Bác sĩ", "Y tá", "Thuốc", "Bệnh viện", "Khám bệnh"
    ],
    "fafa": [
        "Bác sĩ", "Y tá", "Thuốc", "Bệnh viện", "Khám bệnh"
    ],
};

const collections: Collection[] = [
    { id: 'randomstring', name: 'Tất cả từ đã lưu', wordCount: 120 },
    { id: 'randomstring1', name: 'Y tế', wordCount: 45 },
    { id: 'randomstring3', name: 'fafa', wordCount: 10 },
];

const CollectionScreen = () => {
    const [query, setQuery] = useState("");
    const pathname = usePathname();
    const params = useSearchParams();
    const name = params.get("name");
    const words = collectionDictionary["Y tế"];

    const [isCollectionVisible, setIsCollectionVisible] = useState(false);
    const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
    const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [resultState, setResultState] = useState<"move" | "delete">("move");
    const [selectedWord, setSelectedWord] = useState<string | null>(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{
                    paddingHorizontal: spacing.md,
                    marginTop: spacing.lg
                }}>
                    <BackButton color={colors.gray50} />
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
                        Bộ sưu tập: {name}
                    </Text>
                    <Animated.View
                        entering={FadeInLeft.delay(200).duration(500).springify()}
                    >
                        <Search value={query} onChange={setQuery} />
                    </Animated.View>
                </Animated.View>
                <View style={styles.main}>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={words}
                        keyExtractor={(item) => item}
                        renderItem={({ item, index }) => (
                            <Animated.View
                                entering={FadeInUp.delay(100 * index).duration(200)}
                                style={styles.card}
                            >
                                <TouchableOpacity
                                    style={styles.searchItem}
                                    onPress={() => {
                                        router.push(`../word/${encodeURIComponent(item)}`);
                                    }}
                                >
                                    <Text style={{
                                        fontSize: fontSizes.lg,
                                        color: colors.primary600,
                                        fontWeight: 500,
                                        flex: 1,
                                    }}>
                                        {item}
                                    </Text>
                                    <Pressable
                                        onPress={() => {
                                            setSelectedWord(item);
                                            setIsOptionModalVisible(true);
                                        }}
                                        hitSlop={10}
                                        style={{ padding: 4, alignSelf: 'center' }}
                                    >
                                        <ThreeDots width={18} height={18} />
                                    </Pressable>
                                    {/* <View style={{
                                        flexDirection: 'row',
                                        gap: spacing.xs,
                                        alignItems: 'center',
                                        backgroundColor: 'red',
                                    }}> */}

                                    <ChevronRight
                                        color={colors.primary700}
                                        size={28}
                                    />
                                    {/* </View> */}
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    />
                </View>
                <NavBar />

                <WordOptionModal
                    visible={isOptionModalVisible}
                    onClose={() => setIsOptionModalVisible(false)}
                    onMove={() => {
                        setIsCollectionVisible(true);
                        setIsOptionModalVisible(false);
                    }}
                    onDelete={() => {
                        setIsConfirmDeleteModalVisible(true);
                        setIsOptionModalVisible(false);
                    }}
                />

                <CollectionModal
                    isVisible={isCollectionVisible}
                    onCancel={() => setIsCollectionVisible(false)}
                    collections={collections}
                    onConfirm={() => {
                        setIsCollectionVisible(false);
                        setResultState("move");
                        setIsResultVisible(true);
                    }}
                    isMove={true}
                />

                <ResultModal
                    visible={isResultVisible}
                    onClose={() => setIsResultVisible(false)}
                    state={resultState}
                />

                <ConfirmDeleteModal
                    visible={isConfirmDeleteModalVisible}
                    word={selectedWord ?? ""}
                    onCancel={() => {
                        setIsConfirmDeleteModalVisible(false);

                    }}
                    onConfirm={() => {
                        setIsConfirmDeleteModalVisible(false);
                        setResultState("delete");
                        setIsResultVisible(true);
                    }}
                />
            </View>
        </SafeAreaView >
    );
};

export default CollectionScreen;

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
    }, card: {
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