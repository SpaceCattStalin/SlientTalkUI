import ThemedView from '@/components/ThemedView';
import React from 'react';
import { Image, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import SunAnimation from '@/components/animation/SunAnimation';
import ThemedText from '@/components/ThemedText';
import { Link, useRouter } from 'expo-router';
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';

const Login = () => {
    const router = useRouter();

    return (
        <ThemedView safe={true} className='relative h-full bg-[#2877ED]'>
            <Animated.View entering={FadeInLeft.delay(200).duration(1000).springify()}>
                <SunAnimation size={350} />
            </Animated.View>
            {/* <CloudAnimation size={120}/> */}
            <Image source={require('@/assets/images/login_bg.png')} className='h-full w-full absolute bottom-0' />

            <ThemedView className='flex h-full w-full justify-around' transparent={true}>
                <ThemedView className='flex flex-auto justify-end items-center' transparent={true}>
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className='font-semibold text-5xl text-white absolute bottom-28 p-2'>Đăng nhập</Animated.Text>
                </ThemedView>

                <ThemedView className='flex-1 flex items-center pt-20 mx-4 gap-4' transparent={true}>
                    <Animated.View entering={FadeInUp.duration(1000).springify()} className='bg-gray-200 p-1.5 rounded-2xl w-full border-solid'>
                        <TextInput placeholder='Email' className='text-lg' />
                    </Animated.View>
                    <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className='bg-gray-200 p-1.5 rounded-2xl w-full mb-5'>
                        <TextInput placeholder='Mật khẩu' className='text-lg' secureTextEntry />
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} className='w-full'>
                        <TouchableOpacity className='w-full bg-brand-400 p-3 rounded-2xl bg-brand-500'>
                            <ThemedText className='text-xl font-bold text-white text-center'>Đăng nhập</ThemedText>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(700).duration(1000).springify()} className="w-full flex-row items-center my-2">
                        <View className="flex-1 h-[1px] bg-gray-300" />
                        <Text className="mx-3 text-gray-500">Hoặc</Text>
                        <View className="flex-1 h-[1px] bg-gray-300" />
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(800).duration(1000).springify()} className='w-full flex flex-row justify-center gap-8'>
                        <TouchableOpacity className='p-3 rounded-2xl border border-gray-300 flex justify-center items-center'>
                            <Ionicons name="logo-google" size={22} color="#DB4437" />
                        </TouchableOpacity>

                        <TouchableOpacity className='p-3 rounded-2xl border border-gray-300 flex justify-center items-center'>
                            <FontAwesome5 name="facebook" size={24} color="blue" />
                        </TouchableOpacity>

                        <TouchableOpacity className='p-3 rounded-2xl border border-gray-300 flex justify-center items-center'>
                            <Image source={require('@/assets/images/zalo.png')}
                                className="w-8 h-8"
                                resizeMode="contain" />
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(900).duration(1000).springify()} className='flex-row justify-center'>
                        <ThemedText>Bạn chưa có tài khoản? </ThemedText>
                        <TouchableOpacity>
                            <Link href="./signup">
                                <ThemedText className='text-sky-600'>
                                    Đăng ký
                                </ThemedText>
                            </Link>
                        </TouchableOpacity>
                    </Animated.View>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

export default Login;