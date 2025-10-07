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
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useWalkthroughStep, useWalkthrough, WalkthroughProvider } from "react-native-interactive-walkthrough";

import Animated, { FadeInLeft } from "react-native-reanimated";
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';

// import Wave from '@/assets/images/wave.svg';
import Scan from '@/assets/images/scan.svg';
import { useNav } from "@/context/NavContext";

import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import WordDefinitionOverlay4 from '@/components/walkthrough/WordDefinitionOverlay4';
import WordDefinitionOverlay5 from '@/components/walkthrough/WordDefinitionOverlay5';
import WordDefinitionOverlay6 from '@/components/walkthrough/WordDefinitionOverlay6';

const ICON_SIZE = 20;

const collections: Collection[] = [
    { id: 'randomstring', name: 'Tất cả từ đã lưu', wordCount: 12 },
    // { id: 'randomstring1', name: 'Y tế', wordCount: 45 },
    // { id: 'randomstring3', name: 'fafa', wordCount: 10 },
];

const VIDEO_URL = 'https://curious-pauline-catchable.ngrok-free.dev/static/video/';

const relatedWords = [
    "Thầy cô", "Gia đình", "Trường học"
];

export default function WordScreen() {
    const { activeTab, setActiveTab } = useNav();
    const { width, height } = Dimensions.get('window');

    const [videoFile, setVideoFile] = useState('xin_loi.mp4');
    const [videoLoaded, setVideoLoaded] = useState(false);

    const { word } = useLocalSearchParams<{ word: string; }>();
    const [likePressed, setLikePressed] = useState(false);
    const [isCollectionVisible, setIsCollectionVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [resultState, setResultState] = useState<"add" | "save">("save");


    // const renderCount = useRef(0);
    // renderCount.current += 1;

    // console.log(`WordScreen rendered ${renderCount.current} times`);


    const { onLayout: step5OnLayout, start: startStep5, goTo: goToStep5 } = useWalkthroughStep({
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
    useEffect(() => {
        if (!isCollectionVisible) {
            goToStep5(5);
        }
    }, [isCollectionVisible, goToStep5, startStep5]);

    // useEffect(() => {
    //     if (!isCollectionVisible) {
    //         goTo5(5);
    //     }
    // }, [goTo5, isCollectionVisible, startStep5]);

    return (
        <WalkthroughProvider>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, gap: spacing.md }}>
                    <View style={{ paddingHorizontal: spacing.sm, marginTop: spacing.md }}>
                        <BackButton color={colors.gray300} />
                    </View>

                    <View
                        style={styles.definitionContainer}
                        onLayout={step5OnLayout}
                    >
                        <Text style={styles.word}>
                            Bạn bè
                        </Text>
                        <Text style={styles.definition}>
                            Người có mối quan hệ thân thiết,
                            thường xuyên chia sẻ, trò chuyện
                            và hỗ trợ nhau trong học tập hoặc cuộc sống.
                        </Text>
                    </View>
                    <View
                        style={{
                            alignSelf: 'flex-start',
                            position: 'absolute',
                            top: 80,
                            right: 20
                        }}
                        onLayout={step7OnLayout}
                    >
                        <AnimatedLikeIcon
                            primary={colors.red300}
                            accent={colors.gray200}
                            onPress={() => {
                                setIsCollectionVisible(true);
                                stop();
                            }}
                            sizeModifier={1.3}
                        />
                    </View>

                    <View style={styles.main}>
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={{
                                paddingBottom: spacing.lg * 4
                            }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ paddingTop: spacing.xs, flex: 1, gap: spacing.lg }}>
                                {/* <Animated.View
                                style={styles.videoContainer}
                                entering={FadeInLeft.delay(200).duration(500).springify()}
                                onLayout={step6OnLayout}
                            >
                            </Animated.View> */}
                                {/* <Animated.View */}
                                <View
                                    style={styles.videoContainer}
                                    // entering={FadeInLeft.delay(500).duration(500).springify()}
                                    onLayout={step6OnLayout}
                                >
                                    <Video
                                        source={{ uri: `${VIDEO_URL}${videoFile}` }}
                                        style={{ width: width - spacing.md * 2, height: width * 0.5625 }}
                                        controls={true}
                                        paused={true}
                                        onLoad={() => setVideoLoaded(true)}
                                    />
                                </View>
                                <View style={{ gap: spacing.sm }}>
                                    <View
                                    >
                                        <Text style={{ fontSize: fontSizes.md * 1.4, fontWeight: 600, color: colors.primary500 }}>Ví dụ sử dụng:</Text>
                                    </View>
                                    <View
                                    >
                                        <Text style={{ fontSize: fontSizes.sm * 1.2, fontStyle: 'italic', fontWeight: 500, color: colors.primary700 }}>
                                            &quot;Tôi có nhiều bạn bè trong lớp học.&quot;
                                        </Text>
                                    </View>
                                </View>

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

                    {/* <ResultModal
                    visible={isResultVisible}
                    onClose={() => setIsResultVisible(false)}
                    state={resultState}
                /> */}

                    {/* {!canStartWalkthrough && */}
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
                    {/* } */}

                    {/* <AddCollectionModal
                    isVisible={isAddModalVisible}
                    onCancel={() => setIsAddModalVisible(false)}
                    onAdd={() => {
                        setIsAddModalVisible(false);
                        setResultState("add");
                        setIsResultVisible(true);
                    }}
                /> */}
                    <View style={{ ...styles.containerNav }}>
                        <Link href="/home" asChild>
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

                        <Link href="/translate" asChild>
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

                        <Link href="/dictionary" asChild>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setActiveTab("dictionary")}
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

                        <Link href="/profile" asChild>
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
        </WalkthroughProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dictionaryBackground
    },
    definitionContainer: {
        justifyContent: 'flex-start',
        // paddingTop: spacing.lg * 1.8,
        maxWidth: '85%',
        paddingHorizontal: spacing.md,
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
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // or your theme background
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
    },
    addNewText: {
        textAlign: "center",
        color: colors.primary700,
        fontWeight: "bold",
    },
    addNew: {
        borderStyle: "dashed",
        borderColor: colors.primary300,
        backgroundColor: colors.primary100,
    },
    overlayContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 998,
        justifyContent: "center",
        alignItems: "center",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container_fake: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 5,
        padding: spacing.md,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary700,
        marginBottom: spacing.md,
        textAlign: 'center'
    },
    collectionItem: {
        padding: spacing.sm,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: spacing.sm,
    },
    collectionText: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.primary500,
        fontWeight: 400
    }
});