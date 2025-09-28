import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
} from "react-native";
import { spacing, colors } from "@/global/theme";
import { Collection } from "@/types/Types";

type Props = {
    isVisible: boolean;
    onCancel: () => void;
    collections: Collection[];
    onConfirm: (collectionId: string) => void;
    onAdd?: () => void;
    isMove?: boolean;
};

const CollectionModal = ({ isVisible, onCancel, collections, onConfirm, onAdd, isMove = false }: Props) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [newName, setNewName] = useState("");

    const renderItem = ({ item }: { item: Collection; }) => {
        const isSelected = item.id === selectedId;
        return (
            <TouchableOpacity
                style={[styles.collectionItem, isSelected && styles.selected]}
                onPress={() => {
                    if (selectedId == item.id) {
                        setSelectedId(null);
                    } else {
                        setSelectedId(item.id);
                    }
                }}
            >
                <Text style={[styles.collectionText, isSelected && styles.selectedText]}>
                    {item.name} ({item.wordCount})
                </Text>

            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => {
                onCancel();
                setSelectedId(null);
            }}>
                <View
                    style={styles.backdrop}
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {isMove ? "Di chuyển vào bộ sưu tập" : "Lưu vào bộ sưu tập"}
                        </Text>

                        <FlatList
                            data={collections}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                        {!isMove && <TouchableOpacity
                            style={[styles.collectionItem, styles.addNew]}
                            onPress={onAdd}
                        >
                            <Text style={styles.addNewText}>+ Lưu vào bộ sưu tập mới</Text>
                        </TouchableOpacity>}

                        {selectedId && (
                            <View style={styles.buttonsRow}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancel]}
                                    onPress={() => {
                                        onCancel();
                                        setSelectedId(null);
                                    }}                                >
                                    <Text style={styles.buttonText}>Hủy</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.confirm]}
                                    onPress={() => {
                                        onConfirm(selectedId);
                                        setSelectedId(null);
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        {isMove ? "Di chuyển" : "Lưu"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CollectionModal;

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
        textAlign: 'center'
    },
    collectionItem: {
        padding: spacing.sm,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: spacing.sm,
    },
    collectionText: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.primary500,
        fontWeight: 400
    },
    selected: {
        backgroundColor: colors.primary100,
        borderColor: colors.primary300,
    },
    selectedText: {
        color: colors.primary500,
        fontWeight: "bold",
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: spacing.md,
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
    }, addContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.sm,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: spacing.sm,
        marginRight: spacing.xs,
    },
    addNew: {
        borderStyle: "dashed",
        borderColor: colors.primary300,
        backgroundColor: colors.primary100,
    },
    addNewText: {
        textAlign: "center",
        color: colors.primary700,
        fontWeight: "bold",
    },
});
