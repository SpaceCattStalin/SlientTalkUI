import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing } from '@/global/theme';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

import Camera from '@/assets/images/camera.svg';
import Speech from '@/assets/images/speech.svg';
import AdFree from '@/assets/images/ad-free.svg';
import BackButton from '@/components/BackButton';

type Benefit = {
    title: string,
    subtitle?: string;
    icon: React.ComponentType<any>;
};

const benefits: Benefit[] = [
    {
        title: 'Dịch bằng camera',
        subtitle:
            'Sử dụng camera để dịch dấu hiệu trong thời gian thực hoặc dịch văn bản sang ngôn ngữ ký hiệu bằng avatar 3D.',
        icon: Camera
    },
    {
        title: 'Học tương tác',
        subtitle:
            'Luyện tập tương tác, giúp bạn luyện kỹ năng một cách sinh động và thực tế.',
        icon: Speech
    },
    {
        title: 'Không bị gián đoạn',
        subtitle:
            'Tập trung học ngôn ngữ ký hiệu mượt mà và không bị gián đoạn.',
        icon: AdFree
    },
];
const PlanIntro = () => {
    return (
        <SafeAreaView style={styles.container}>
            <BackButton color={colors.gray200} />
            <View style={styles.main}>
                <Text
                    style={{
                        fontSize: fontSizes['2xl'],
                        fontWeight: 700,
                        color: colors.gray50
                    }}>
                    Nâng cấp lên Premium
                </Text>
                <Text style={styles.subtitle}>
                    Trải nghiệm đầy đủ tất cả tính năng
                </Text>

                {benefits.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <View key={index} style={styles.feature}>
                            <Icon
                                width={80}
                                height={80} />
                            <View style={{ flex: 1 }}>
                                <Text style={{
                                    color: colors.gray50,
                                    fontSize: fontSizes.lg,
                                    fontWeight: 600,
                                    marginBottom: spacing.sm
                                }}>{item.title}</Text>
                                <Text style={{
                                    color: colors.gray100,
                                    lineHeight: spacing.md * 1.2,
                                    wordWrap: 'wrap'
                                }}>
                                    {item.subtitle}
                                </Text>
                            </View>
                        </View>
                    );
                })}

                <TouchableOpacity style={styles.btn} onPress={() => router.push('./plan') }>
                    <Text style={{
                        color: colors.gray100,
                        fontWeight: 600,
                        fontSize: fontSizes.md
                    }}>
                        Xem các gói
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default PlanIntro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.lg * 1.25,
        paddingHorizontal: spacing.md,
        backgroundColor: '#2463C9'
    },
    main: {
        marginTop: spacing.md,
        flex: 1
    },
    subtitle: {
        fontSize: 16,
        color: colors.gray50,
        marginBottom: spacing.lg,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.md,
        backgroundColor: '#0B3478',
        borderRadius: 10,
        borderWidth: .5,
        borderColor: colors.gray50,
        marginBottom: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 2,
    },
    btn: {
        // flexGrow: 0,
        // alignSelf: 'center',
        // paddingHorizontal: 24,
        marginTop: spacing.lg * 2,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: "#F97316",
    }
});