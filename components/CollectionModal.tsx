import * as React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import HomeIcon from '@/assets/images/home.svg';
import Profile from '@/assets/images/profile.svg';
import Search from '@/assets/images/search.svg';
import { useNav } from "@/context/NavContext";
import { colors, fontSizes, spacing } from "@/global/theme";
import { Collection } from "@/types/Types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useWalkthroughStep } from "react-native-interactive-walkthrough";
import WordDefinitionOverlay4 from "./walkthrough/WordDefinitionOverlay4";
import WordDefinitionOverlay5 from "./walkthrough/WordDefinitionOverlay5";
// import Wave from '@/assets/images/wave.svg';
import Scan from '@/assets/images/scan.svg';
import WordDefinitionOverlay6 from "./walkthrough/WordDefinitionOverlay6";

type Props = {
    isVisible: boolean;
    onCancel: () => void;
    collections: Collection[];
    onConfirm: (collectionId: string) => void;
    onAdd?: () => void;
    isMove?: boolean;
    inDictionary?: boolean;
};
const ICON_SIZE = 20;

const CollectionModal = ({ isVisible, onCancel, collections, onConfirm, onAdd, isMove = false, inDictionary = false, walkthroughDone }: Props) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [newName, setNewName] = useState("");
    const { activeTab, setActiveTab } = useNav();

    const { onLayout: step8OnLayout, goTo: goTo8, start: startStep8 } = useWalkthroughStep({
        number: 8,
        fullScreen: false,
        OverlayComponent: WordDefinitionOverlay4,
    });

    const { onLayout: step9OnLayout } = useWalkthroughStep({
        number: 9,
        fullScreen: false,
        OverlayComponent: WordDefinitionOverlay5,
    });

    const { onLayout: step10OnLayout } = useWalkthroughStep({
        number: 10,
        fullScreen: false,
        maskAllowInteraction: true,
        OverlayComponent: WordDefinitionOverlay6,
    });
    useEffect(() => {
        if (!inDictionary)
            goTo8(8);
    }, [goTo8, inDictionary, startStep8]);

    if (!isVisible) return null;

    const renderItem = ({ item }: { item: Collection; }) => {
        const isSelected = item.id === selectedId;
        return (
            <TouchableOpacity
                style={[styles.collectionItem, isSelected && styles.selected]}
                onPress={() => {
                    if (selectedId === item.id) {
                        setSelectedId(null);
                    } else {
                        setSelectedId(item.id);
                    }
                }}
            >
                <Text style={[styles.collectionText, isSelected && styles.selectedText]}>
                    {item.name} ({item.wordCount})
                </Text>

            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.overlayContainer}>

            <TouchableWithoutFeedback
                style={{
                    zIndex: 10
                }}
                onPress={() => {
                    onCancel();
                    setSelectedId(null);
                }}>
                <View
                    style={styles.backdrop}
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {isMove ? "Di chuyển vào bộ sưu tập" : "Lưu vào bộ sưu tập"}
                        </Text>

                        <FlatList
                            onLayout={step8OnLayout}
                            data={collections}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                        {!isMove &&
                            <TouchableOpacity
                                style={[styles.collectionItem, styles.addNew]}
                                onPress={onAdd}
                                onLayout={step9OnLayout}
                            >
                                <Text style={styles.addNewText}>+ Lưu vào bộ sưu tập mới</Text>
                            </TouchableOpacity>}

                        {selectedId && (
                            <View style={styles.buttonsRow}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancel]}
                                    onPress={() => {
                                        onCancel();
                                        setSelectedId(null);
                                    }}                                >
                                    <Text style={styles.buttonText}>Hủy</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.confirm]}
                                    onPress={() => {
                                        onConfirm(selectedId);
                                        setSelectedId(null);
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        {isMove ? "Di chuyển" : "Lưu"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {/* -------------------------------------------------- */}
            <View style={{ ...styles.containerNav }}>
                <Link href="/home" asChild>
                    <TouchableOpacity onPress={() => setActiveTab("home")}>
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
                        onLayout={step10OnLayout}
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

            {/* </Modal> */}
        </View>
    );
};

export default CollectionModal;

const styles = StyleSheet.create({
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
    container: {
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
    },
    selected: {
        backgroundColor: colors.primary100,
        borderColor: colors.primary300,
    },
    selectedText: {
        color: colors.primary500,
        fontWeight: "bold",
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: spacing.md,
    },
    button: {
        flex: 1,
        padding: spacing.sm,
        marginHorizontal: spacing.xs,
        borderRadius: 10,
        alignItems: "center",
    },
    cancel: {
        backgroundColor: "#ccc",
    },
    confirm: {
        backgroundColor: colors.primary300,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    }, addContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.sm,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: spacing.sm,
        marginRight: spacing.xs,
    },
    addNew: {
        borderStyle: "dashed",
        borderColor: colors.primary300,
        backgroundColor: colors.primary100,
    },
    addNewText: {
        textAlign: "center",
        color: colors.primary700,
        fontWeight: "bold",
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
