import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import Search from '@/components/Searchbar';
import NavBar from '@/components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing } from '@/global/theme';
import Header from '@/components/Header';
import { ChevronRight } from 'lucide-react-native';

import AnimatedLikeIcon from '@/components/animation/AnimatedLikeIcon';
import { useRouter } from 'expo-router';
import ResultModal from '@/components/ResultModal';
import CollectionModal from '@/components/CollectionModal';
import AddCollectionModal from '@/components/AddModal';
import { Collection } from '@/types/Types';

const categories = ["Triệu chứng", "Bộ phận cơ thể", "Điều trị", "Trường học"];

const collections: Collection[] = [
    { id: 'randomstring', name: 'Tất cả từ đã lưu', wordCount: 120 },
    { id: 'randomstring1', name: 'Y tế', wordCount: 45 },
    { id: 'randomstring3', name: 'fafa', wordCount: 10 },
];

const dictionary = [
    "Bố", "Mẹ", "Banh", "Cô", "Kẹo",
    "Anh", "Chị", "Em", "Ông", "Bà",
    "Cơm", "Nước", "Sữa", "Bánh mì", "Táo",
    "Thầy", "Cô giáo", "Bạn", "Sách", "Bút",
    "Xin chào", "Cảm ơn", "Xin lỗi", "Có", "Không"
];

const Index = () => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const [isCollectionVisible, setIsCollectionVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [resultState, setResultState] = useState<"add" | "save">("save");

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

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <SafeAreaView style={styles.container}>
                {/* <Header /> */}
                <View style={{ flex: 1 }}>
                    <View style={styles.searchContainer}>
                        <Text
                            style={{
                                paddingHorizontal: spacing.md,
                                fontSize: fontSizes['2xl'],
                                fontWeight: 700,
                                color: colors.gray50
                            }}>
                            Bạn cần kiếm ký hiệu gì?
                        </Text>
                        <Search value={query} onChange={setQuery} />
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
                    </View>
                    <View style={styles.main}>
                        {query ? (
                            results.length > 0 ? (
                                <View style={{ marginTop: spacing.lg, paddingHorizontal: spacing.md }}>
                                    <FlatList
                                        style={{ marginTop: 10 }}
                                        data={results}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <View style={styles.card}>
                                                <TouchableOpacity
                                                    style={styles.searchItem}
                                                    onPress={() => {
                                                        console.log(item);
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
                                            </View>
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
                        ) : (<View style={{ flex: 1, gap: spacing.md, justifyContent: 'flex-start' }}>
                            <Text style={{
                                textAlign: 'center',
                                color: colors.primary700,
                                fontSize: fontSizes['2xl'],
                                fontWeight: 700,
                                marginTop: spacing.lg,
                            }}>Khám phá theo chủ đề</Text>
                            <View style={styles.topicsContainer}>
                                <View style={styles.topicContainer}>
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
                                </View>
                                <View style={styles.topicContainer}>
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
                                </View>
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

export default Index;

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
        // borderWidth: 1,
        // borderRadius: 10,
        // borderColor: colors.gray100,
        // paddingHorizontal: spacing.md,
        // paddingVertical: spacing.sm,
    }
});