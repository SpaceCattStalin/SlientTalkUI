import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';

const BackgroundDecoration = () => {
    // const { width } = Dimensions.get('window');

    return (
        <View style={styles.main}>
            {/* <Image source={require('@/assets/images/three_line.png')} style={{ width: width * 0.3, height: width * 0.3, ...styles.three_line }} />
            <Image source={require('@/assets/images/ellipse_1.png')} style={{ width: width * 0.3, height: width * 0.3, ...styles.ellipse_1 }} />
            <Image source={require('@/assets/images/ellipse_2.png')} style={{ width: width * 0.3, height: width * 0.3, ...styles.ellipse_2 }} /> */}
            {/* <Image source={require('@/assets/images/three_line.png')} style={styles.three_line} /> */}
            <Image source={require('@/assets/images/decor_1.png')} style={styles.decor_1} />
            <Image source={require('@/assets/images/ellipse_1.png')} style={styles.ellipse_1} />
            <Image source={require('@/assets/images/ellipse_2.png')} style={styles.ellipse_2} />

        </View>
    );
};

export default BackgroundDecoration;

const styles = StyleSheet.create({
    main: {
        position: "absolute",
        width: "100%",
        height: "100%"
        // zIndex: -1
    },
    decor_1: {
        position: "absolute",
        right: 6,
        aspectRatio: 1,
        // top: "40%"
        top: 40
    },
    ellipse_1: {
        position: "absolute",
        bottom: 0,
        left: 0,
        aspectRatio: 1
    },
    ellipse_2: {
        position: "absolute",
        bottom: 0,
        right: 0,
        aspectRatio: 1
    },
    // three_line: {
    //     position: "absolute",
    //     right: 0,
    //     aspectRatio: 1,
    //     top: 0,
    // }
});