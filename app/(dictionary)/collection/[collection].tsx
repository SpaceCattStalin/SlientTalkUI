import ThreeDots from '@/assets/images/three_dots.svg';
import BackButton from '@/components/BackButton';
import CollectionModal from '@/components/CollectionModal';
import ConfirmDeleteModal from '@/components/ConfirmActionModal';
import ResultModal from '@/components/ResultModal';
import Search from '@/components/Searchbar';
import CollectionWordsOverlay from '@/components/walkthrough/CollectionScreenOverlay2';
import CollectionOptionOverlay from '@/components/walkthrough/CollectionScreenOverlay3';
import CollectionOption4Overlay from '@/components/walkthrough/CollectionScreenOverlay4';
import WordOptionModal from '@/components/WordOptionModal';
import { useNav } from '@/context/NavContext';
import { colors, fontSizes, spacing } from '@/global/theme';
import { ApiResponse, Collection, GetWordsByCollection, SignWord } from '@/types/Types';
import { Link, router } from 'expo-router';
import { useLocalSearchParams, usePathname, useRouter, useSearchParams } from 'expo-router/build/hooks';
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
import { useRoute } from '@react-navigation/native';
import { getWordsInCollection } from '@/services/api';
import NavBar from '@/components/NavBar';

const ICON_SIZE = 20;


const CollectionScreen = () => {
    const { activeTab, setActiveTab } = useNav();

    const [query, setQuery] = useState("");
    const { collection } = useLocalSearchParams<{ collection: string; }>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signWords, setSignWords] = useState<SignWord[]>();
    const [collectionName, setCollectionName] = useState<string>();

    const [isCollectionVisible, setIsCollectionVisible] = useState(false);
    const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
    const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [resultState, setResultState] = useState<"move" | "delete">("move");
    const [selectedWord, setSelectedWord] = useState<SignWord>();

    useEffect(() => {
        const fetchWordsInCollection = async () => {
            try {
                setIsLoading(true);
                const res: ApiResponse<GetWordsByCollection> = await getWordsInCollection(collection);
                if (res.isSuccess) {
                    setSignWords(res.data.words);
                    setCollectionName(res.data.collectionName);
                    setIsLoading(false);
                }
            } catch (err: any) {
                console.log("Lỗi khi fetch words trong collection");
            }
        };

        fetchWordsInCollection();
    }, [collection]);

    const handleDelete = async () => {
        
    } 

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{
                    paddingHorizontal: spacing.md,
                    marginTop: spacing.lg
                }}>
                    <BackButton color={colors.gray50} />
                </View>
                <View style={{
                    flex: 1,
                }}>
                    {!isLoading && <Animated.View
                        style={styles.searchContainer}
                        entering={FadeInLeft.duration(500).springify()}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.md }}>
                            <Text
                                style={{
                                    fontSize: fontSizes['xl'],
                                    fontWeight: 700,
                                    color: colors.gray300
                                }}>
                                Bộ sưu tập:
                            </Text>
                            <Text style={{
                                fontSize: fontSizes['2xl'],
                                fontWeight: 700,
                                color: colors.gray50,
                                paddingLeft: spacing.sm
                            }}>
                                {collectionName}
                            </Text>
                        </View>
                        <Animated.View
                            entering={FadeInLeft.delay(200).duration(500).springify()}
                        >
                            <Search value={query} onChange={setQuery} />
                        </Animated.View>
                    </Animated.View>
                    }
                </View>

                <View style={styles.main}>
                    <View>
                        <FlatList
                            style={{
                                marginTop: 10, marginHorizontal: spacing.lg,
                            }}
                            data={signWords}
                            keyExtractor={(item: SignWord) => item.signWordId}
                            renderItem={({ item, index }: { item: SignWord, index: number; }) => (
                                <Animated.View
                                    entering={FadeInUp.delay(100 * index).duration(200)}
                                    style={styles.card}
                                >
                                    <TouchableOpacity
                                        style={styles.searchItem}
                                        onPress={() => {
                                            router.push(`/word/${encodeURIComponent(item.signWordId)}`);
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: fontSizes.lg,
                                            color: colors.primary600,
                                            fontWeight: 500,
                                            flex: 1,
                                        }}>
                                            {item.word}
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

                                        <ChevronRight
                                            color={colors.primary700}
                                            size={28}
                                        />
                                    </TouchableOpacity>
                                </Animated.View>
                            )}
                        />
                    </View>
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

                {/* <CollectionModal
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
                /> */}

                <ResultModal
                    visible={isResultVisible}
                    onClose={() => setIsResultVisible(false)}
                    state={resultState}
                />

                <ConfirmDeleteModal
                    visible={isConfirmDeleteModalVisible}
                    //word={selectedWord ?? ""}
                    message={`Bạn có chắc bỏ thích kí hiệu cho ${selectedWord?.word} này!`}
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