import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const Login = () => {

    const onButtonPress = () => {
        console.log("Hi");
    };

    return (
        <View>
            <Text>
                Login Screen
            </Text>

            <TextInput placeholder='Email' />
            <Button onPress={onButtonPress} title='Login' />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({});