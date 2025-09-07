import Card from '@/components/Card';
import NavBar from '@/components/NavBar';
import { spacing, colors } from '@/global/theme';
import React from 'react';
import { StyleSheet, View, Text, Pressable, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* <BackgroundDecoration /> */}
            {/* <View className='flex flex-1' style={styles.background}> */}

            <View className='flex-1'>
                <View style={styles.main}>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <View className='flex-row gap-6 align-middle'>
                                <View>
                                    <Image
                                        source={require('@/assets/images/avatar1.png')}
                                        className="w-20 h-20 rounded-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <View className='flex-1 justify-start gap-1'>
                                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' }}>Nguyen van A</Text>
                                    <View className='flex-row justify-between'>
                                        <View className='flex-row items-center'>
                                            <View className="w-2 h-2 rounded-full bg-white mr-[6px]" />
                                            <View className='flex-row items-baseline'>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>3</Text>
                                                <Text style={{ fontSize: 16, fontWeight: 'semibold', color: '#FFFFFF' }}> phien dich</Text>
                                            </View>
                                        </View>

                                        <View className='flex-row items-center'>
                                            <View className="w-2 h-2 rounded-full bg-white mr-[6px]" />
                                            <View className='flex-row items-baseline'>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>32</Text>
                                                <Text style={{ fontSize: 16, fontWeight: 'semibold', color: '#FFFFFF' }}> tu da luu</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View >
                    <View className='gap-4'>
                        <Text className='text-[20px] font-bold'>Bạn đã</Text>

                        <View className='flex flex-row gap-7'>
                            <View className='flex-1'>
                                <Card
                                    icon={require('@/assets/images/flame.png')}
                                    title={<Text style={{ fontSize: 20, fontWeight: 'semibold' }}>Chuỗi</Text>}
                                    content={<Text style={{ fontSize: 16, fontWeight: 'bold' }}>2 ngày</Text>}
                                    gradientColors={['#FEA033', '#FFFFFF']}
                                    width='100%'
                                    height={120} />
                            </View>

                            <View className='flex-1'>
                                <Card
                                    icon={require('@/assets/images/eye.png')}
                                    title={<Text style={{ fontSize: 20, fontWeight: 'semibold' }}>Luyện tập</Text>}
                                    content={<Text style={{ fontSize: 16, fontWeight: 'bold' }}>16 giờ 23 phút</Text>}
                                    gradientColors={['#88A9FD', '#FFFFFF']}
                                    width='100%'
                                    height={120} />
                            </View>
                        </View>
                    </View>


                    <View className='gap-4'>
                        <Text className='text-[20px] font-bold'>Mỗi ngày một ký hiệu</Text>

                        <Card
                            justifyContent='center'
                            icon={require('@/assets/images/star.png')}
                            title={
                                <Pressable onPress={() => console.log("Xem chi tiết Dũng cảm")}>
                                    <Text style={{ fontSize: 24, fontWeight: '600', textDecorationLine: 'underline' }}>
                                        Dũng cảm
                                    </Text>
                                </Pressable>
                            }
                            gradientColors={['#FFC342', '#FFFFFF']}
                            width='100%'
                            height={120} />
                    </View>

                    <View className='flex-1 gap-4'>
                        <Card
                            justifyContent='flex-start'
                            promo={require('@/assets/images/promo.png')}
                            title={
                                <Pressable onPress={() => console.log("Xem chi tiết Dũng cảm")}>
                                    <Text style={{ fontSize: 24, fontWeight: '600', textDecorationLine: 'underline' }}>
                                        Nâng cấp gói của bạn
                                    </Text>
                                </Pressable>
                            }
                            content={
                                <Text style={{ fontSize: 16, fontWeight: 'semibold' }}>
                                    Dùng thử 1 tháng, hủy bất cứ lúc nào
                                </Text>
                            }
                            gradientColors={['#FFC342', '#FFFFFF']}
                            width="100%"
                            height={130} />
                    </View>
                </View>
                {/* Logo, chuông thông báo, tài khoản */}
                {/* <Header className='flex-0'/> */}

                {/* Lời chào cá nhân + hình chào ngôn ngữ ký hiệu, chuỗi học icon */}
                {/* <View className='flex-1'>

                </View> */}

                {/* <Hero /> */}

                {/* 4 nút "Khám phá", "Tra từ", "Luyện nhớ", "About us" */}
                {/* <View className='flex-1 bg-blue-300'>

            </View> */}

                {/* Thanh navbar */}
                {/* <View className='flex-1 bg-black'>
            </View> */}
                <NavBar />
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
        // padding: spacing.md,
        // backgroundColor: "red"
    },
    main: {
        display: 'flex',
        flex: 1,
        paddingTop: spacing.md,
        paddingHorizontal: spacing.lg,
        gap: spacing.lg * 1.5
    },
    background: {
        backgroundColor: "#E8F1FF"
    },
    card: {
        borderRadius: 12,
        // elevation: 10,
        padding: spacing.md,
        backgroundColor: "#005DF8",
        overflow: 'hidden',
        ...Platform.select({
            android: {
                elevation: 10
            }
        })
    },
    cardContent: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm
    }
});;