import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import ThemedView from './ThemedView';
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderProps = {
    className?: string;
};

const Header = ({ className }: HeaderProps) => {
    const insets = useSafeAreaInsets();

    return (
        <ThemedView
            safe={true}
            className={`${className}`}
            style={styles.header}
        >

            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
            />
            {/* <View>
                <View style={{ height: .5, backgroundColor: "#d3d3d3" }} />
                <View style={{ height: .5, backgroundColor: "#a9a9a9" }} />
            </View> */}
        </ThemedView>
    );
};

export default Header;


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#2877ED",
        paddingHorizontal: 16,
        // height: 60,
        flexDirection: "row",
        alignItems: "center"
    },
    logo: {
        height: 24,
        aspectRatio: 1,
        objectFit: "contain"
    },
});
