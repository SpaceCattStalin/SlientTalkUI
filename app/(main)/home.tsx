import AnimateChveron from '@/components/animation/AnimateChveron';
import AnimatedLikeIcon from '@/components/animation/AnimatedLikeIcon';
import Card from '@/components/Card';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { spacing, colors, fontSizes } from '@/global/theme';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Pressable, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import BackgroundDecoration from '@/components/BackgroundDecoration';
import AnimatedTyping from '@/components/animation/AnimatedTyping';
import { router } from 'expo-router';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const Home = () => {
    const player = useVideoPlayer('https://www.w3schools.com/html/mov_bbb.mp4');

    const route = useRoute();

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundDecoration />
            {/* <View className='flex flex-1' style={styles.background}> */}
            <Header />
            <View className='flex-1'>
                <View style={styles.main}>

                    <View style={{ marginTop: spacing.md }}>
                        <AnimatedTyping
                            textToType={["Xin chào, An"]}
                            displayLogo={false}
                            textStyle={styles.greeting}
                        />
                    </View>

                    <Animated.View
                        style={styles.summary}
                        entering={FadeInLeft.delay(200).duration(1000).springify()}
                    >
                        <View style={{
                            flex: 1,
                            gap: 8,
                            paddingVertical: spacing.sm,
                            borderRightWidth: .5,
                            borderRightColor: colors.gray500,
                        }}>
                            <Text style={{
                                ...styles.summaryTitle, textAlign: 'center',
                            }}>Chuỗi</Text>
                            <View>
                                <View className='flex-row justify-center' >
                                    <Image source={require('@/assets/images/flame_1.png')}
                                        style={{
                                            resizeMode: 'contain',
                                        }}
                                        width={35}
                                        height={35}
                                    />
                                    <Text style={{ fontSize: fontSizes.xl, color: colors.gray700, fontWeight: 800, alignSelf: 'center' }}>4</Text>
                                </View>
                                <Text style={{ fontSize: fontSizes.md, color: colors.gray500, textAlign: 'center' }}>ngày</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, gap: 8, ...styles.summaryBulletContainer }}>
                            <View>
                                <Text style={{
                                    textAlign: 'center',
                                    paddingHorizontal: spacing.xs,
                                    paddingBottom: spacing.xs,
                                    color: colors.gray700,
                                    fontWeight: 500,
                                    fontSize: fontSizes.lg
                                }}>
                                    Tuần này bạn đã
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        color: colors.primary400,
                                        textAlign: 'center',
                                        fontSize: fontSizes.lg,
                                        fontWeight: 700
                                    }}>320</Text>
                                    <Text style={{
                                        flexShrink: 1,
                                        flexWrap: 'wrap',
                                        textAlign: 'center',
                                        fontSize: fontSizes.md,
                                        color: colors.gray500
                                    }}>phút luyện tập</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 700, color: colors.orange400, textAlign: 'center', fontSize: fontSizes.lg }}>12</Text>
                                    <Text style={{
                                        flexShrink: 1,
                                        flexWrap: 'wrap',
                                        textAlign: 'center',
                                        fontSize: fontSizes.md,
                                        color: colors.gray500
                                    }}>từ tìm kiếm</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 700, color: colors.green400, textAlign: 'center', fontSize: fontSizes.lg }}>1</Text>
                                    <Text style={{
                                        flexShrink: 1, flexWrap: 'wrap', textAlign: 'center',
                                        fontSize: fontSizes.md,
                                        color: colors.gray500
                                    }}>
                                        phiên dịch real-time
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    <View
                        className='gap-4 mt-1'
                    >
                        <Animated.View
                            entering={FadeInLeft.delay(300).duration(500).springify()}
                        >
                            <Text
                                style={{
                                    fontSize: fontSizes.xl,
                                    fontWeight: 600,
                                    color: colors.primary600
                                    //color: colors.gray50
                                }}>
                                Từ của ngày hôm nay
                            </Text>
                        </Animated.View>
                        <Animated.View
                            entering={FadeInLeft.delay(400).duration(500).springify()}
                            style={{
                                borderWidth: .75,
                                borderColor: colors.gray500,
                                borderRadius: 10,
                                backgroundColor: colors.gray100,
                                padding: spacing.md,
                                alignSelf: 'stretch',
                                gap: 8,
                                ...Platform.select({
                                    ios: {
                                        shadowColor: '#ddd',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4
                                    },
                                    android: { elevation: 2 },
                                }),
                            }}>
                            <View>
                                <Image
                                    source={require('@/assets/images/3d.png')}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        alignSelf: 'center',
                                        resizeMode: 'contain',
                                        marginTop: spacing.lg
                                    }}
                                />
                                {/* <VideoView
                                    player={player}
                                    style={{ width: '100%', aspectRatio: 16 / 9 }}
                                /> */}
                                {/* <Video
                                    source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
                                    style={{ width: '100%', aspectRatio: 16 / 9 }}
                                    controls
                                /> */}
                            </View>
                            <View>
                                <View className='gap-4'>
                                    <View className='flex-row'>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: fontSizes['2xl'], fontWeight: 600, color: colors.gray800 }}>Bạn bè</Text>
                                            <Text style={{ fontSize: fontSizes.xs, color: colors.blueAccent550, fontWeight: 400 }}>Danh từ</Text>
                                        </View>
                                        {/* <AnimatedLikeIcon
                                            primary={colors.red500}
                                            accent={colors.blueAccent500}
                                            onPress={() => console.log("Hi")}
                                        /> */}
                                        <AnimateChveron
                                            onPress={() =>
                                                router.push({
                                                    pathname: "../(dictionary)/word/[word]",
                                                    params: { word: "friend" },
                                                })
                                            }
                                        />
                                    </View>

                                    <Text style={{
                                        fontSize: fontSizes.sm,
                                        flexShrink: 1,
                                        flexWrap: 'wrap',
                                        color: colors.gray700
                                    }}>
                                        Người có mối quan hệ thân thiết,
                                        thường xuyên chia sẻ, trò chuyện
                                        và hỗ trợ nhau trong học tập hoặc cuộc sống.
                                    </Text>
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                    {/* <View className='gap-4'>
                        <View className='flex flex-row gap-7'>
                            <View className='flex-1'>
                                <Card
                                    icon={require('@/assets/images/flame.png')}
                                    iconSize={{ width: 70, height: 70 }}
                                    title={<Text style={{ fontSize: fontSizes.lg, fontWeight: 'semibold' }}>Chuỗi</Text>}
                                    content={<Text style={{ fontSize: fontSizes.sm, fontWeight: 'bold' }}>2 ngày</Text>}
                                    gradientColors={[colors.orange400, colors.gray100]}
                                    width='100%'
                                    height={80} />
                            </View>

                            <View className='flex-1'>
                                <Card
                                    icon={require('@/assets/images/eye.png')}
                                    iconSize={{ width: 70, height: 70 }}
                                    title={<Text style={{ fontSize: fontSizes.lg, fontWeight: 'semibold' }}>Luyện tập</Text>}
                                    content={<Text style={{ fontSize: fontSizes.sm, fontWeight: 'bold' }}>16 giờ 23 phút</Text>}
                                    gradientColors={[colors.blueAccent400, colors.gray100]}
                                    width='100%'
                                    height={80} />
                            </View>
                        </View>
                    </View> */}


                    {/* <View className='gap-4'>
                        <Text className='text-[20px] font-bold'>Mỗi ngày một ký hiệu</Text>

                        <Card
                            justifyContent='center'
                            icon={require('@/assets/images/star.png')}
                            // iconSize={{ width: 30, height: 30 }}
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
                    </View> */}

                    {/* <View className='flex-1 gap-4'>
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
                    </View> */}
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
                {/* <Navigation /> */}
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7FA'
        // backgroundColor: colors.gray100
        // backgroundColor: '#2C6AEF'
    },
    test: {
        backgroundColor: 'red'
    },
    main: {
        display: 'flex',
        flex: 1,
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,

        gap: spacing.lg
    },
    greeting: {
        fontWeight: 600,
        fontSize: fontSizes['3xl'] * 1.5,
        color: colors.primary500,
        //color: colors.gray50,
        flex: 1
    },
    summary: {
        backgroundColor: colors.gray100,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderColor: colors.gray600,
        borderWidth: .75,
        borderRadius: 10,

        ...Platform.select({
            ios: {
                shadowColor: '#ddd',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4
            },
            android: { elevation: 2 },
        }),
    },
    summaryTitle: {
        fontSize: fontSizes.lg,
        fontWeight: 600,
        color: colors.gray700
    },
    summaryBulletContainer: {
        // backgroundColor: colors.orange300,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm
    },

    // card: {
    //     borderRadius: 12,
    //     // elevation: 10,
    //     padding: spacing.md,
    //     backgroundColor: colors.primary300,
    //     overflow: 'hidden',
    //     ...Platform.select({
    //         android: {
    //             elevation: 10
    //         }
    //     })
    // },
    // cardContent: {
    //     paddingHorizontal: spacing.sm,
    //     paddingVertical: spacing.sm
    // },
    video: {
        width: '100%',
        height: '100%',
    },
});;