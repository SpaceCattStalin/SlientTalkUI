import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing } from '@/global/theme';
import BackButton from '@/components/BackButton';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '@/components/NavBar';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';

const PlanCard = ({
    title,
    subtitle,
    price,
    discount,
    features,
    isPremium = false,
    onSubscribe,
    onApply,
}: {
    title: string;
    subtitle: string;
    price?: string;
    discount?: string;
    features: string[];
    isPremium?: boolean;
    onSubscribe?: () => void;
    onApply?: () => void;
}) => {
    return (
        <Animated.View
            style={styles.card}
            entering={FadeInDown.duration(500)}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{title}</Text>
                {isPremium && (
                    <Ionicons name="diamond" size={20} color={colors.primary500} />
                )}
            </View>

            {price && <Text style={styles.price}>{price}</Text>}
            {discount && <Text style={styles.discount}>{discount}</Text>}

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>

            <View style={{ marginTop: spacing.md }}>
                {features.map((f, idx) => (
                    <Text key={idx} style={styles.feature}>
                        • {f}
                    </Text>
                ))}
            </View>

            {isPremium && (
                <View style={{ marginTop: spacing.lg }}>
                    <TouchableOpacity style={styles.subscribeBtn} onPress={onSubscribe}>
                        <Text style={styles.subscribeText}>Đăng ký</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.applyBtn}
                        onPress={onApply}
                        disabled={!onApply}
                    >
                        <Text style={styles.applyText}>Đăng ký chương trình giảm giá</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Animated.View>
    );
};

const PaymentPlans = () => {
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={styles.container}>

                <BackButton color={colors.gray200} />

                <Animated.View entering={FadeInLeft.duration(500).springify()}>
                    <Text style={styles.header}>Chọn gói phù hợp cho bạn</Text>
                </Animated.View>


                <PlanCard
                    title="Gói Cơ bản"
                    subtitle="Miễn phí trọn đời"
                    features={[
                        'Truy cập Từ điển Ngôn ngữ Ký hiệu',
                        'Dùng chế độ Luyện tập với số lượng giới hạn',
                    ]}
                />
                <PlanCard
                    title="Gói Cao cấp"
                    subtitle="Người khiếm thính, sinh viên ngành Giáo dục, Y tế và Công tác xã hội"
                    price="69.000 VND/tháng"
                    discount="Giảm 20%"
                    features={[
                        'Lưu không giới hạn từ vào bộ sưu tập',
                        'Dịch ngôn ngữ ký hiệu theo thời gian thực',
                        'Hỗ trợ ưu tiên và dùng thử miễn phí 1 tháng',
                    ]}
                    isPremium
                    onSubscribe={() => {
                    }}
                />

            </View>
            <NavBar />
        </SafeAreaView>
    );
};

export default PaymentPlans;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.lg * 1.25,
        paddingHorizontal: spacing.md,
        backgroundColor: '#2463C9',
    },
    header: {
        marginTop: spacing.md,
        fontSize: fontSizes['2xl'],
        fontWeight: '700',
        marginBottom: spacing.lg,
        color: colors.gray50,
    },
    card: {
        backgroundColor: colors.gray50,
        borderRadius: 12,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    cardTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.gray800,
    },
    price: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.primary500,
        marginBottom: spacing.xs,
    },
    discount: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.primary600,
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: fontSizes.sm,
        color: colors.gray600,
    },
    feature: {
        fontSize: fontSizes.sm,
        color: colors.gray800,
        marginBottom: spacing.sm,
    },
    subscribeBtn: {
        backgroundColor: '#F97316',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    subscribeText: {
        color: colors.gray50,
        fontWeight: '600',
        fontSize: fontSizes.md,
    },
    applyBtn: {
        backgroundColor: colors.gray300,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyText: {
        color: colors.gray700,
        fontWeight: '500',
        fontSize: fontSizes.sm,
    },
});
