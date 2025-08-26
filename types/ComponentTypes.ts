import { PressableProps, TextProps, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps;
export type ThemedTextProps = TextProps;

export interface ThemedButtonProps extends PressableProps {
    title: string;
}