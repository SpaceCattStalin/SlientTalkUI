import { Linking, StyleSheet, Text, TouchableOpacity, View, NativeModules, NativeEventEmitter, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing } from '@/global/theme';
import BackButton from '@/components/BackButton';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '@/components/NavBar';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { createPayment } from '@/services/api';
import { CreatePaymentRequest, CreatePaymentResponse } from '@/types/Types';
import ResultModal from '@/components/ResultModal';

const { PayZaloBridgeModule } = NativeModules;
const payZaloEmitter = new NativeEventEmitter(PayZaloBridgeModule);

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
                {/* {isPremium && (
                    <Ionicons name="diamond" size={20} color={colors.primary500} />
                )} */}
            </View>

            {price && <Text style={styles.price}>{price}</Text>}
            {/* {discount && <Text style={styles.discount}>{discount}</Text>} */}

            {/* <Text style={styles.subtitle}>
                {subtitle}
            </Text> */}

            <View style={{ marginTop: spacing.sm }}>
                {features.map((f, idx) => (
                    <Text key={idx} style={styles.feature}>
                        • {f}
                    </Text>
                ))}
            </View>

            {isPremium ? (
                <View style={{ marginTop: spacing.lg }}>
                    <TouchableOpacity style={styles.subscribeBtn} onPress={onSubscribe}>
                        <Text style={styles.subscribeText}>Đăng ký</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={styles.applyBtn}
                        onPress={onApply}
                        disabled={!onApply}
                    >
                        <Text style={styles.applyText}>Đăng ký chương trình giảm giá</Text>
                    </TouchableOpacity> */}
                </View>
            ) :
                <View style={{ marginTop: spacing.lg }}>
                    <TouchableOpacity
                        style={styles.applyBtn}
                        onPress={onApply}
                        disabled={!onApply}
                    >
                        <Text style={styles.applyText}>Gói hiện tại</Text>
                    </TouchableOpacity>
                </View>
            }
        </Animated.View>
    );
};

const PaymentPlans = () => {
    const [loading, setLoading] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);

    const createZaloPayment = async () => {
        try {
            setLoading(true);
            const request: CreatePaymentRequest = {
                userId: "",
                amount: 69000,
                description: "Đăng kí SlienTalk Premium",
                itemName: "SilentTalk Premium 1 Tháng"

            };
            const res: CreatePaymentResponse = await createPayment(request);

            if (res.zpTransToken) {
                await startPayment(res.zpTransToken);
            }

        } catch (err: any) {
            console.log("Lỗi khi tạo đơn hàng thanh toán!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Registering EventPayZalo listener");

        const sub = payZaloEmitter.addListener('EventPayZalo', (data) => {
            console.log("Hi");
            setLoading(false);
            if (data.errorCode === 1) {
                setIsResultVisible(true);
            } else {
            }
        });
        return () => sub.remove();
    }, []);
    // console.log('PayZaloBridgeModule', PayZaloBridgeModule);

    const startPayment = async (zpToken: string) => {
        try {
            const res = await PayZaloBridgeModule.payOrder(zpToken, 'silentalk');
            console.log('payOrder result', res);
        } catch (err) {
            console.log(err);
            console.warn('payOrder err', err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flex: 1, paddingTop: spacing.lg * 1.25,
                paddingHorizontal: spacing.md,
            }}>

                <BackButton color={colors.primary800} />
                <View style={{ paddingHorizontal: spacing.md }}>
                    <Animated.View entering={FadeInLeft.duration(500).springify()}>
                        <Text style={styles.header}>Chọn gói phù hợp cho bạn</Text>
                    </Animated.View>


                    <PlanCard
                        title="Gói Cơ bản"
                        subtitle="Miễn phí trọn đời"
                        features={[
                            'Truy cập Từ điển Ngôn ngữ Ký hiệu',
                            'Dùng chế độ Phiên dịch với số lượng giới hạn',
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
                            'Không bị quảng cáo gián đoạn',
                            'Hỗ trợ ưu tiên và dùng thử miễn phí 1 tháng',
                        ]}
                        isPremium
                        onSubscribe={createZaloPayment}
                    />
                </View>

            </View>
            <View>
                <NavBar />
            </View>

            <ResultModal
                visible={isResultVisible}
                onClose={() => {
                    setIsResultVisible(false);
                }}
                state={'payment'}
            />


            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={colors.primary500} />
                    <Text style={{ marginTop: 8, color: colors.gray700 }}>Đang xử lý thanh toán...</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default PaymentPlans;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: spacing.lg * 1.25,
        // paddingHorizontal: spacing.md,
        //backgroundColor: '#2463C9',
        flex: 1,
        backgroundColor: colors.gray200,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: spacing.sm,
        fontSize: fontSizes['2xl'],
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: spacing.lg,
        color: colors.gray700,
    },
    card: {
        backgroundColor: colors.gray50,
        borderRadius: 12,
        padding: spacing.md,
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
