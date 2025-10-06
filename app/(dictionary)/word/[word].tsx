// app/(dictionary)/[word].tsx
import HomeIcon from '@/assets/images/home.svg';
import Profile from '@/assets/images/profile.svg';
import Search from '@/assets/images/search.svg';
import AddCollectionModal from "@/components/AddModal";
import AnimatedLikeIcon from "@/components/animation/AnimatedLikeIcon";
import BackButton from "@/components/BackButton";
import CollectionModal from "@/components/CollectionModal";
import ResultModal from "@/components/ResultModal";
import WordDefinitionOverlay from "@/components/walkthrough/WordDefinitionOverlay";
import WordDefinitionVideoOverlay from "@/components/walkthrough/WordDefinitionOverlay2";
import WordDefinitionLikeButtonOverlay from "@/components/walkthrough/WordDefinitionOverlay3";
import { colors, fontSizes, spacing } from "@/global/theme";
import { Collection } from "@/types/Types";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWalkthroughStep } from "react-native-interactive-walkthrough";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { SafeAreaView } from 'react-native-safe-area-context';
// import Wave from '@/assets/images/wave.svg';
import Scan from '@/assets/images/scan.svg';
import { useNav } from "@/context/NavContext";
import WordDefinition6Overlay from "@/components/walkthrough/WordDefinitionOverlay6";
import ModelViewer from "@/components/animation/ModelViewer";
const ICON_SIZE = 20;

const collections: Collection[] = [
    { id: 'randomstring', name: 'Tất cả từ đã lưu', wordCount: 12 },
    // { id: 'randomstring1', name: 'Y tế', wordCount: 45 },
    // { id: 'randomstring3', name: 'fafa', wordCount: 10 },
];

const relatedWords = [
    "Thầy cô", "Gia đình", "Trường học"
];

export default function WordScreen() {
    const { activeTab, setActiveTab } = useNav();

    const { word } = useLocalSearchParams<{ word: string; }>();

    const [walkthroughCompleted, setWalkthroughCompleted] = useState(false);
    const [likePressed, setLikePressed] = useState(false);
    const [isCollectionVisible, setIsCollectionVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [resultState, setResultState] = useState<"add" | "save">("save");

    // const currentStep = 5;

    const { onLayout: step5OnLayout, goTo: goTo5, start: startStep5 } = useWalkthroughStep({
        number: 5,
        fullScreen: false,
        OverlayComponent: WordDefinitionOverlay,
    });

    const { onLayout: step6OnLayout } = useWalkthroughStep({
        number: 6,
        fullScreen: false,
        OverlayComponent: WordDefinitionVideoOverlay,
    });

    const { onLayout: step7OnLayout, stop } = useWalkthroughStep({
        number: 7,
        fullScreen: false,
        maskAllowInteraction: true,
        OverlayComponent: WordDefinitionLikeButtonOverlay,
    });

    // useEffect(() => {
    //     if (!isCollectionVisible) {
    //         goTo5(5);
    //     }
    // }, [startStep5, goTo5, isCollectionVisible]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, gap: spacing.md }}>
                <View style={{ paddingHorizontal: spacing.sm, marginTop: spacing.md }}>
                    <BackButton color={colors.gray300} />
                </View>
                <Animated.View
                    style={styles.definitionContainer}
                    entering={FadeInLeft.duration(500).springify()}
                    onLayout={step5OnLayout}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: spacing.sm * 1.5,
                    }}>
                        <Text style={styles.word}>
                            Bạn bè
                        </Text>

                        <View onLayout={step7OnLayout}>
                            <AnimatedLikeIcon
                                primary={colors.red300}
                                accent={colors.gray200}
                                // onPress={() => setLikePressed(true)}
                                onPress={() => {
                                    setIsCollectionVisible(true);
                                    stop();
                                }}
                                sizeModifier={1.1}
                            />
                        </View>
                    </View>
                    <Text style={styles.definition}>
                        Người có mối quan hệ thân thiết,
                        thường xuyên chia sẻ, trò chuyện
                        và hỗ trợ nhau trong học tập hoặc cuộc sống.
                    </Text>
                </Animated.View>


                <View style={styles.main}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            paddingBottom: spacing.lg * 4
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ paddingTop: spacing.md, flex: 1, gap: spacing.lg }}>
                            <Animated.View
                                style={styles.videoContainer}
                                entering={FadeInLeft.delay(200).duration(500).springify()}
                                onLayout={step6OnLayout}
                            >
                                {/* <Image
                                    source={require('@/assets/images/3d.png')}
                                    style={{
                                        width: 280,
                                        height: 280,
                                        alignSelf: 'center',
                                        resizeMode: 'contain',
                                    }}
                                /> */}
                                {/* <ModelViewer /> */}
                            </Animated.View>

                            <View style={{ gap: spacing.sm }}>
                                <Animated.View
                                    entering={FadeInLeft.delay(300).duration(500).springify()}
                                >
                                    <Text style={{ fontSize: fontSizes.md * 1.4, fontWeight: 600, color: colors.primary500 }}>Ví dụ sử dụng:</Text>
                                </Animated.View>
                                <Animated.View
                                    entering={FadeInLeft.delay(400).duration(500).springify()}
                                >
                                    <Text style={{ fontSize: fontSizes.sm * 1.2, fontStyle: 'italic', fontWeight: 500, color: colors.primary700 }}>
                                        &quot;Tôi có nhiều bạn bè trong lớp học.&quot;
                                    </Text>
                                </Animated.View>
                            </View>
                            {/* <Animated.View
                                style={styles.videoContainer}
                                entering={FadeInLeft.delay(500).duration(500).springify()}
                            >
                              
                                <Image
                                    source={require('@/assets/images/3d.png')}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        alignSelf: 'center',
                                        resizeMode: 'contain',
                                    }}
                                />
                            </Animated.View> */}
                            <View style={{ flex: 1, gap: spacing.sm }}>
                                <Text style={{ fontSize: fontSizes.md, fontWeight: 600, color: colors.primary500 }}>Các ký hiệu liên quan</Text>
                                <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                                    {relatedWords.map((item, index) => (
                                        // <View key={index} style={styles.relatedWords}>
                                        //     <Text>{item}</Text>
                                        // </View>
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.relatedWords}
                                            onPress={() => {
                                                console.log(`Đi tới từ: ${item}`);
                                                // hoặc router.push(`/dictionary/${item}`)
                                            }}
                                        >
                                            <Text style={{ fontSize: fontSizes.sm * 1.2, fontWeight: 600, color: colors.primary700 }}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
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
                        <TouchableOpacity style={styles.translateBtn} onPress={() => setActiveTab("translate")}>
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
                                <Search
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
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dictionaryBackground
    },
    definitionContainer: {
        // flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        // paddingTop: spacing.lg * 1.8,
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
        gap: spacing.md
    },
    main: {
        flex: 4,
        borderRadius: 30,
        backgroundColor: colors.gray50,
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,
        gap: spacing.lg
    },
    word: {
        fontSize: fontSizes["4xl"],
        fontWeight: 800,
        color: colors.gray50
    },
    definition: {
        fontSize: fontSizes.md,
        fontWeight: 700,
        color: colors.gray100
    },
    videoContainer: {
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: 'yellow',
        // flex: 1.2,
        // backgroundColor: 'black'
    },
    relatedWords: {
        padding: spacing.sm,
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