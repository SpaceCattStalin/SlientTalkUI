import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { spacing, colors } from "@/global/theme";
import { Collection } from "@/types/Types";

type Props = {
    isVisible: boolean;
    onCancel: () => void;
    onAdd: (newCollection: Collection) => void;
};

const AddCollectionModal = ({ isVisible, onCancel, onAdd }: Props) => {
    const [name, setName] = useState("");

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => {
                onCancel();
                setName("");
            }}>
                <View style={styles.backdrop}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Tạo bộ sưu tập mới</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Tên bộ sưu tập"
                            value={name}
                            onChangeText={setName}
                        />

                        <View style={styles.buttonsRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancel]}
                                onPress={() => {
                                    onCancel();
                                    setName("");
                                }}>
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.confirm]}
                                onPress={() => {
                                    if (name.trim()) {
                                        const newCollection: Collection = {
                                            id: Date.now().toString(),
                                            name: name.trim(),
                                            wordCount: 0,
                                        };
                                        onAdd(newCollection);
                                        setName("");
                                        onCancel();
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>Tạo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AddCollectionModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 5,
        padding: spacing.md,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary700,
        marginBottom: spacing.md,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: spacing.sm,
        marginBottom: spacing.md,
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: spacing.sm,
    },
    button: {
        flex: 1,
        padding: spacing.sm,
        marginHorizontal: spacing.xs,
        borderRadius: 10,
        alignItems: "center",
    },
    cancel: {
        backgroundColor: "#ccc",
    },
    confirm: {
        backgroundColor: colors.primary300,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});
