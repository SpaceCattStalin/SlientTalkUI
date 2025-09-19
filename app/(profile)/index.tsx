import { StyleSheet, Text, View, Image, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors, fontSizes, spacing } from '@/global/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';

import Background from '@/assets/images/bg-1.svg';
import Avatar from '@/assets/images/avatar.svg';
import Profile from '@/assets/images/profile.svg';
import Wallet from '@/assets/images/wallet.svg';
import Lock from '@/assets/images/lock.svg';
import Logout from '@/assets/images/logout.svg';
import NavBar from '@/components/NavBar';
import AnimatedButton from '@/components/animation/AnimatedButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import LogoutModal from '@/components/LogoutModal';

const Index = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {logoutVisible && (
        <View style={styles.overlay} pointerEvents="auto">
          {/* tapping outside should also close the modal */}
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={() => setLogoutVisible(false)}
          />
        </View>
      )}
      <View className='flex-1'>
        <View style={styles.profileContainer}>
          <Background
            style={StyleSheet.absoluteFillObject}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          />
          <View style={{
            paddingTop: spacing.lg,
            paddingHorizontal: spacing.md,
          }}>
            <Text
              style={{
                fontSize: fontSizes['2xl'],
                fontWeight: 700,
                color: colors.gray50
              }}>
              Tài khoản
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
              width={110}
              height={110}
            />
            <View
              style={{
                alignItems: 'center',
                gap: spacing.xs,
                marginTop: spacing.md
              }}>
              <Text
                style={{
                  fontSize: fontSizes.lg * 1.25,
                  fontWeight: 600,
                  color: colors.gray50
                }}
              >
                Nguyễn Văn A
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <Text style={{
            color: colors.primary800,
            fontWeight: 600,
            fontSize: fontSizes.xl
          }}>
            Tổng quan tài khoản
          </Text>
          <View style={styles.optionsContainer}>

            <AnimatedButton onPress={() => router.push('./account')}>
              <View style={styles.optionWrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                  <View style={{ ...styles.iconContainer, backgroundColor: '#E6F0FB' }}>
                    <Profile
                      width={20}
                      height={20}
                      stroke={'#629BEE'}
                    />
                  </View>
                  <Text style={styles.optionTitle}>Thông tin tài khoản</Text>
                </View>
                <View>
                  <ChevronRight />
                </View>
              </View>
            </AnimatedButton>

            <AnimatedButton onPress={() => router.push('./planIntro')}>
              <View style={styles.optionWrapper}>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                  <View style={{ ...styles.iconContainer, backgroundColor: '#E6F0FB' }}>
                    <Wallet
                      width={20}
                      height={20}
                      stroke={'#629BEE'}
                    />
                  </View>
                  <Text style={styles.optionTitle}>Gói đăng kí</Text>
                </View>
                <View>
                  <ChevronRight />
                </View>
              </View>
            </AnimatedButton>

            {/* <AnimatedButton>
              <View style={styles.optionWrapper}>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                  <View style={{ ...styles.iconContainer, backgroundColor: '#E6F0FB' }}>
                    <Lock
                      width={20}
                      height={20}
                    />
                  </View>
                  <Text style={styles.optionTitle}>Đổi mật khẩu</Text>
                </View>

                <View>
                  <ChevronRight />
                </View>
              </View>
            </AnimatedButton> */}


            <AnimatedButton onPress={() => setLogoutVisible((prev) => !prev)}>
              <View style={styles.optionWrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                  <View style={{ ...styles.iconContainer, backgroundColor: '#E6F0FB' }}>
                    <Logout
                      width={20}
                      height={20}
                    />
                  </View>
                  <Text style={styles.optionTitle}>Đăng xuất</Text>
                </View>

                <View>
                  <ChevronRight />
                </View>
              </View>
            </AnimatedButton>

          </View>
        </View>
        <LogoutModal isVisible={logoutVisible} onCancel={() => setLogoutVisible((prev) => !prev)} />
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C6AEF"
  },
  profileContainer: {
    flex: 2,
  },
  main: {
    flex: 4,
    borderRadius: 40,
    backgroundColor: colors.gray50,
    paddingTop: spacing.lg * 1.25,
    paddingHorizontal: spacing.md,
    gap: spacing.lg
  },
  optionsContainer: {
    gap: spacing.md
  },
  iconContainer: {
    padding: spacing.md,

    borderRadius: 10,
  },
  optionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionTitle: {
    fontSize: fontSizes.lg,
    color: colors.primary800,
    fontWeight: '500',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});