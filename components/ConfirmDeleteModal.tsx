import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { colors, spacing } from "@/global/theme";

type ConfirmDeleteModalProps = {
  visible: boolean;
  word: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({ visible, word, onCancel, onConfirm }: ConfirmDeleteModalProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.message}>
              Xác nhận xóa từ <Text style={styles.word}>“{word}”</Text>
            </Text>

            <View style={styles.actions}>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                <Text style={styles.cancelText}>Hủy bỏ</Text>
              </Pressable>

              <Pressable style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                <Text style={styles.confirmText}>Xác nhận</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: spacing.md,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  word: {
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: colors.gray100,
  },
  confirmButton: {
    backgroundColor: colors.primary600,
  },
  cancelText: {
    color: colors.primary600,
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});
