import { colors, spacing } from "@/global/theme";
import { Check } from "lucide-react-native";
import React, { useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback } from "react-native";

type Props = {
    visible: boolean;
    onClose: () => void;
    state: "add" | "save";
};

const ResultModal = ({ visible, onClose, state }: Props) => {
    const isAdd = state === "add";
    
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (visible) {
            timer = setTimeout(() => {
                onClose();
            }, 1400);
        }
        return () => clearTimeout(timer);
    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <TouchableWithoutFeedback onPress={() => {
                onClose();
            }}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {isAdd ? "Tạo thành công!" : "Lưu thành công!"}
                        </Text>

                        <View style={styles.checkBtn}>
                            <Check size={50} strokeWidth={4} color={colors.gray50} />
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 15,
        width: "75%",
        elevation: 5,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        textAlign: 'center'
    },
    checkBtn: {
        padding: 15,
        alignSelf: 'center',
        backgroundColor: colors.primary700,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ResultModal;
