import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing } from '@/global/theme';
import { ChevronLeft } from 'lucide-react-native';

import Avatar from '@/assets/images/avatar.svg';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import NavBar from '@/components/NavBar';

import EditPen from '@/assets/images/edit-icon.svg';
import BackButton from '@/components/BackButton';
import AnimatedButton from '@/components/animation/AnimatedButton';
import { LinearGradient } from 'expo-linear-gradient';

const Account = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={styles.container}>
                {/* <LinearGradient
                    colors={['#0B3478', '#2877ED']}
                    locations={[0, 0.5]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFillObject}
                /> */}
                <BackButton color={colors.primary800} />
                <View style={styles.header}>
                    <Text
                        style={{
                            fontSize: fontSizes['2xl'],
                            fontWeight: 700,
                            color: colors.primary800
                        }}>
                        Thông tin tài khoản
                    </Text>

                    <Pressable onPress={() => setIsEditing(!isEditing)}>
                        <Feather
                            name={isEditing ? "x" : "edit"}
                            size={28}
                            color={colors.primary800}
                        />
                    </Pressable>
                </View>
                <View
                    style={styles.card}>
                    <View style={styles.avatarSection}>
                        <View>
                            <Avatar
                                width={100}
                                height={100}
                            />
                            <View style={styles.penButton}>
                                {/* <EditPen style={styles.penButton} /> */}
                                <EditPen/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.main}>
                        <View style={{ alignItems: 'flex-start', gap: spacing.sm }}>
                            <Text style={styles.label}>Tên</Text>

                            <View style={styles.inputWrapper}>
                                <MaterialCommunityIcons
                                    name="account"
                                    size={20}
                                    color="black"
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nguyen Van An"
                                    placeholderTextColor="#999"
                                    keyboardType="default"
                                    editable={isEditing}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-start', gap: spacing.sm }}>
                            <Text style={styles.label}>Email</Text>

                            <View style={styles.inputWrapper}>
                                <Feather
                                    name="mail"
                                    size={20}
                                    color="black"
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="xxx@gmail.com"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    editable={isEditing}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-start', gap: spacing.sm }}>
                            <Text style={styles.label}>Số điện thoại</Text>

                            <View style={styles.inputWrapper}>
                                <Feather name="phone" size={20} color="black" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="0869255375"
                                    placeholderTextColor="#999"
                                    keyboardType="number-pad"
                                    editable={isEditing}
                                />
                            </View>
                        </View>
                    </View>
                    {isEditing && (
                        <View style={styles.actionRow}>
                            <AnimatedButton
                                style={[styles.actionBtn, styles.cancelBtn]}
                                onPress={() => setIsEditing(false)}>
                                <Text style={styles.cancelText}>
                                    Hủy
                                </Text>
                            </AnimatedButton>
                        
                            <AnimatedButton
                                style={[styles.actionBtn, styles.saveBtn]}
                                onPress={() => console.log("Save changes")}
                            >
                                <Text style={styles.saveText}>Lưu</Text>
                            </AnimatedButton>
                        </View>
                    )}

                </View>
            </View>
            <NavBar />
        </SafeAreaView>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.lg * 1.25,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.gray100,
        marginBottom: spacing.lg * 4
    },
    header: {
        alignSelf: 'stretch',
        marginBottom: spacing.md,
        marginTop: spacing.md,
        justifyContent: 'space-between',
        gap: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        flex: 3,
        marginTop: spacing.lg,
        gap: spacing.lg,
    },
    label: {
        fontSize: fontSizes.md,
        fontWeight: "600",
        color: colors.primary800,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
    penButton: {
        position: "absolute",
        bottom: 0,
        right: 10,
        backgroundColor: "#F97316",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    card: {
        flex: 1,
        padding: spacing.lg,
        backgroundColor: "#fff", // cards usually white
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.gray200, // lighter border for subtle look

        // Shadow (iOS)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        // Elevation (Android)
        elevation: 3,
    },
    readonlyInput: {
        backgroundColor: colors.gray100,
        color: colors.gray500,
    },
    actionRow: {
        paddingHorizontal: spacing.lg,
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        gap: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "white",
        zIndex: 10,
    },
    actionBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    cancelBtn: {
        backgroundColor: colors.gray200,
    },

    saveBtn: {
        backgroundColor: colors.primary500,
    },

    cancelText: {
        color: colors.primary800,
        fontWeight: "600",
        fontSize: fontSizes.md,
    },

    saveText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: fontSizes.md,
    },
});