import { ThemedViewProps } from "@/types/ComponentTypes";
import React from "react";
import { View } from "react-native";

const ThemedView = ({ className, children, ...props }: ThemedViewProps) => {
    return (
        <View className={`bg-white ${className || ""}`} {...props}>
            {children}
        </View>
    );
};

export default ThemedView;