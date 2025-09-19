// app/(dictionary)/[word].tsx
import AnimateChveron from "@/components/animation/AnimateChveron";
import AnimatedLikeIcon from "@/components/animation/AnimatedLikeIcon";
import BackButton from "@/components/BackButton";
import NavBar from "@/components/NavBar";
import { colors, fontSizes, spacing } from "@/global/theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const relatedWords = [
    "placeholder", "placeholder", "placeholder"
];

export default function WordScreen() {
    const { word } = useLocalSearchParams<{ word: string; }>();



    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, gap: spacing.md }}>
                <View style={{ paddingHorizontal: spacing.xs, marginTop: spacing.sm }}>
                    <BackButton color={colors.gray300} />
                </View>
                <View style={styles.definitionContainer}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: spacing.sm * 1.5
                    }}>
                        <Text style={styles.word}>
                            Bạn bè
                        </Text>
                        <AnimatedLikeIcon
                            primary={colors.red300}
                            accent={colors.gray300}
                            onPress={() => console.log('Liked!')}
                            sizeModifier={1.2}
                        />
                    </View>
                    <Text style={styles.definition}>
                        Người có mối quan hệ thân thiết,
                        thường xuyên chia sẻ, trò chuyện
                        và hỗ trợ nhau trong học tập hoặc cuộc sống.
                    </Text>
                </View>

                <View style={styles.main}>
                    <View style={{ paddingTop: spacing.md, flex: 1, gap: spacing.lg }}>
                        <View style={styles.videoContainer}>

                        </View>
                        <View style={styles.videoContainer}>
                            <View style={{ gap: spacing.sm }}>
                                <Text style={{ fontSize: fontSizes.md * 1.4, fontWeight: 600, color: colors.primary500 }}>Ví dụ sử dụng:</Text>
                                <Text style={{ fontSize: fontSizes.sm * 1.2, fontStyle: 'italic', fontWeight: 500, color: colors.primary700 }}>&quot;Tôi có nhiều bạn bè trong lớp học.&quot;</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, gap: spacing.sm }}>
                            <Text style={{ fontSize: fontSizes.md, fontWeight: 600, color: colors.primary500 }}>Các ký hiệu liên quan</Text>
                            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                                {relatedWords.map((item, index) => (
                                    <View key={index} style={styles.relatedWords}>
                                        <Text>{item}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
                <NavBar />
            </View>
        </SafeAreaView>
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
        borderRadius: 60,
        backgroundColor: colors.gray50,
        paddingTop: spacing.md * 2,
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
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'yellow',
        flex: 1.2,
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
    }
});