import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import Selfie from "../../assets/images/selfie.svg";

const styles = StyleSheet.create({
});
export default function Index() {
  return (
    <View
      className="flex-1 justify-center items-center"
    >
      {/* <Text className="text-5xl text-dark-200 font-bold">Welcome!</Text> */}
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center">
          <Image source={require("../../assets/images/selfie.jpg")} />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
