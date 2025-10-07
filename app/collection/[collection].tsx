import ThreeDots from '@/assets/images/three_dots.svg';
import BackButton from '@/components/BackButton';
import CollectionModal from '@/components/CollectionModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import ResultModal from '@/components/ResultModal';
import Search from '@/components/Searchbar';
import CollectionWordsOverlay from '@/components/walkthrough/CollectionScreenOverlay2';
import CollectionOptionOverlay from '@/components/walkthrough/CollectionScreenOverlay3';
import CollectionOption4Overlay from '@/components/walkthrough/CollectionScreenOverlay4';
import WordOptionModal from '@/components/WordOptionModal';
import { useNav } from '@/context/NavContext';
import { colors, fontSizes, spacing } from '@/global/theme';
import { Collection } from '@/types/Types';
import { Link, router } from 'expo-router';
import { usePathname, useSearchParams } from 'expo-router/build/hooks';
import { ChevronRight } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeIcon from '@/assets/images/home.svg';
import Profile from '@/assets/images/profile.svg';
import SearchIcon from '@/assets/images/search.svg';
// import Wave from '@/assets/images/wave.svg';
import Scan from '@/assets/images/scan.svg';

const ICON_SIZE = 20;

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
    const { activeTab, setActiveTab } = useNav();

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

    const { onLayout: step14OnLayout, goTo: goTo15, start: startStep15 } = useWalkthroughStep({
        number: 15,
        fullScreen: false,
        OverlayComponent: CollectionWordsOverlay,
    });


    const { onLayout: step15OnLayout, next } = useWalkthroughStep({
        number: 16,
        fullScreen: false,
        OverlayComponent: CollectionOptionOverlay,
    });

    const { onLayout: step16OnLayout} = useWalkthroughStep({
        number: 17,
        fullScreen: false,
        maskAllowInteraction: true,
        OverlayComponent: CollectionOption4Overlay,
    });


    useEffect(() => {
        goTo15(15);
    }, [startStep15, goTo15]);

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
                    <View>
                        <FlatList
                            onLayout={step14OnLayout}
                            style={{
                                marginTop: 10, marginHorizontal: spacing.lg,
                            }}
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
                                            onLayout={step15OnLayout}
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
                </View>
                {/* <NavBar /> */}
                <View style={{ ...styles.containerNav }}>
                    <Link href="/(main)/home" asChild>
                        <TouchableOpacity style={styles.button} onPress={() => setActiveTab("home")}>
                            {/* <View style={{ backgroundColor: activeTab === "home" ? "red" : "transparent", ...styles.wrapper }}> */}
                            <View style={styles.wrapper}>
                                <HomeIcon
                                    width={ICON_SIZE}
                                    height={ICON_SIZE}
                                    stroke={activeTab === "home" ? colors.primary400 : colors.gray500}
                                    fill={activeTab === "home" ? colors.primary400 : colors.gray500}
                                />
                                <Text style={{ color: activeTab === "home" ? colors.primary400 : colors.gray500, ...styles.text }}>Trang chủ</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    {/* <Link href="/(practice)" asChild>
                <TouchableOpacity style={styles.button} onPress={() => setActiveTab("practice")}>
                    <View style={styles.wrapper}>
                        <Book
                            width={ICON_SIZE}
                            height={ICON_SIZE}
                            stroke={activeTab === "practice" ? colors.primary400 : colors.gray500}
                        />
                        <Text style={{ color: activeTab === "practice" ? colors.primary400 : colors.gray500, ...styles.text }}>Luyện tập</Text>
                    </View>
                </TouchableOpacity>
            </Link> */}

                    {/* <Button style={styles.button}>
                <Wave width={ICON_SIZE} height={ICON_SIZE} />
            </Button> */}

                    <Link href="/(translate)" asChild>
                        <TouchableOpacity
                            style={styles.translateBtn}
                            onPress={() => {
                                next();
                                setActiveTab("translate");
                                //stop();
                            }}
                            onLayout={step16OnLayout}
                        >
                            <View style={{ ...styles.wrapper, }}>
                                <Scan
                                    width={ICON_SIZE}
                                    height={ICON_SIZE}
                                    stroke={activeTab === "translate" ? colors.primary400 : colors.gray500}
                                />
                                <Text style={{ color: activeTab === "translate" ? colors.primary400 : colors.gray500, ...styles.text }}>
                                    Phiên dịch
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/(dictionary)" asChild>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setActiveTab("dictionary")}
                        // onLayout={step8OnLayout}
                        >
                            <View style={{ ...styles.wrapper, }}>
                                <SearchIcon
                                    width={ICON_SIZE}
                                    height={ICON_SIZE}
                                    stroke={activeTab === "dictionary" ? colors.primary400 : colors.gray500}
                                />
                                <Text style={{ color: activeTab === "dictionary" ? colors.primary400 : colors.gray500, ...styles.text }}>Từ điển</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/(profile)" asChild>
                        <TouchableOpacity style={styles.button} onPress={() => setActiveTab("profile")}>
                            <View style={{ ...styles.wrapper }}>
                                <Profile
                                    width={ICON_SIZE}
                                    height={ICON_SIZE}
                                    stroke={activeTab === "profile" ? colors.primary400 : colors.gray500}
                                />
                                <Text style={{ color: activeTab === "profile" ? colors.primary400 : colors.gray500, ...styles.text }}>Tài khoản</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                </View>
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
                    inDictionary={true}
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
    },
    containerNav: {
        width: '100%',
        flexDirection: 'row',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        height: 70
    },
    button: {

    },
    translateBtn: {
        // position: 'relative',
        // bottom: 20,
        // backgroundColor: colors.gray50,
        // padding: spacing.sm,
        // borderRadius: 999,
        // borderColor: '#ddd',
        // borderWidth: 1
    },
    wrapper: {
        borderRadius: 10,
        padding: spacing.sm,
        justifyContent: "center",
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    },
    text: {
        fontSize: fontSizes.sm,
        fontWeight: 500
    },
    link: {
        position: 'absolute'
    }
});