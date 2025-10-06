import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors, fontSizes, spacing } from "@/global/theme";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Searchbar";
import AnimatedLikeIcon from "@/components/animation/AnimatedLikeIcon";
import NavBar from "@/components/NavBar";
import ResultModal from "@/components/ResultModal";
import CollectionModal from "@/components/CollectionModal";
import AddCollectionModal from "@/components/AddModal";
import { Collection } from "@/types/Types";
import BackButton from "@/components/BackButton";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";

const collections: Collection[] = [
    { id: 'randomstring', name: 'Tất cả từ đã lưu', wordCount: 12 },
    // { id: 'randomstring1', name: 'Y tế', wordCount: 45 },
    // { id: 'randomstring3', name: 'fafa', wordCount: 10 },
];

const topicDictionary: Record<string, string[]> = {
    "Gia đình": [
        "Bố", "Mẹ", "Anh", "Chị", "Em", "Ông", "Bà", "Con", "Cháu",
        "Vợ", "Chồng", "Cô", "Dì", "Chú", "Bác", "Anh họ", "Chị họ"
    ],
    "Y tế": [
        "Bác sĩ", "Y tá", "Thuốc", "Bệnh viện", "Khám bệnh"
    ],
    "Trường học": [
        "Thầy", "Cô giáo", "Bạn", "Sách", "Bút", "Bảng", "Vở", "Lớp học"
    ],
    "Câu hỏi": ["Xin chào", "Cảm ơn", "Xin lỗi", "Có", "Không"],
};

const dictionary = [
    "Bố", "Mẹ", "Banh", "Cô", "Kẹo",
    "Anh", "Chị", "Em", "Ông", "Bà",
    "Cơm", "Nước", "Sữa", "Bánh mì", "Táo",
    "Thầy", "Cô giáo", "Bạn", "Sách", "Bút",
    "Xin chào", "Cảm ơn", "Xin lỗi", "Có", "Không"
];

export default function TopicDetailScreen() {
    const { topic } = useLocalSearchParams();
    const wordsForTopic = topicDictionary[topic as string] || [];

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const [isCollectionVisible, setIsCollectionVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [resultState, setResultState] = useState<"add" | "save">("save");

    const router = useRouter();

    useEffect(() => {
        if (query.length > 0) {
            const filtered = dictionary.filter((word) =>
                word.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            // setResults([]);
            setResults(wordsForTopic);
        }
    }, [query]);
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.searchContainer}>
                        <View style={{ marginLeft: spacing.sm, marginBottom: spacing.sm }}>
                            <BackButton color={colors.gray50} />
                        </View>
                        <Animated.View
                            entering={FadeInLeft.duration(500).springify()}
                        >
                            <Text
                                style={{
                                    paddingHorizontal: spacing.md,
                                    fontSize: fontSizes.xl,
                                    fontWeight: 700,
                                    color: colors.gray50
                                }}>
                                Tìm kiếm trong chủ đề &quot;{topic}&quot;
                            </Text>
                        </Animated.View>
                        <Animated.View
                            entering={FadeInLeft.delay(200).duration(500).springify()}
                        >
                            <Search value={query} onChange={setQuery} />
                        </Animated.View>
                    </View>
                </View>
                <View style={styles.main}>

                    {results.length > 0 ? (
                        <View style={{ marginTop: spacing.lg, paddingHorizontal: spacing.md, marginBottom: spacing.lg * 4 }}>
                            <FlatList
                                style={{ marginTop: 10 }}
                                data={results.length > 0 ? results : wordsForTopic}
                                keyExtractor={(item) => item}
                                renderItem={({ item,index }) => (
                                    <Animated.View
                                        entering={FadeInUp.delay(100 * index).duration(200)}
                                        style={styles.card}
                                    >
                                        <TouchableOpacity
                                            style={styles.searchItem}
                                        // onPress={() => {
                                        //     console.log(item);
                                        //     router.push(`./${item}`);
                                        // }}
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
                    ) :
                        <View style={{ flex: 1, gap: spacing.md, justifyContent: 'flex-start' }}>
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
                    }
                </View>
                <NavBar />

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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C6AEF",
    },

    searchContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
        marginBottom: spacing.md
    },
    main: {
        //flex: 3,
        flex: 3,
        borderRadius: 60,
        backgroundColor: colors.gray50,
        // gray50: #FDFDFE
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,
        gap: spacing.lg
    }, topicsContainer: {
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
