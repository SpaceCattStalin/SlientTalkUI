import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import Home from '@/assets/images/home.svg';
import Book from '@/assets/images/book.svg';
import Search from '@/assets/images/search.svg';
import Profile from '@/assets/images/profile.svg';
import Wave from '@/assets/images/wave.svg';

type NavbarProps = {
    style?: object;
};

const NavBar = ({ style }: NavbarProps) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            <Button style={styles.button}>
                <Home width={24} height={24} />
                {/* <Image source={require('@/assets/images/home.png')} style={styles.image} /> */}
            </Button>

            <Button style={styles.button}>
                <Book width={24} height={24} />
                {/* <Image source={require('@/assets/images/book.png')} style={styles.image} /> */}
            </Button>

            <Button style={styles.button}>
                <Wave width={30} height={30} />
                {/* <Image source={require('@/assets/images/search.png')} style={styles.image} /> */}
            </Button>

            <Button style={styles.button}>
                <Search width={24} height={24} />
                {/* <Image source={require('@/assets/images/search.png')} style={styles.image} /> */}
            </Button>

            <Button style={styles.button}>
                <Profile width={24} height={24} />
                {/* <Image source={require('@/assets/images/profile.png')} style={styles.image} /> */}
            </Button>
        </View>
    );
};

export default NavBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        height: 60
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignContent: 'center'
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    }
});