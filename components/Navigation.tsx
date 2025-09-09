import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NavBar from "./NavBar";
import { Redirect, router, usePathname } from "expo-router";

export default function Navigation() {
    const [activeTab, setActiveTab] = useState("home");

    const pathname = usePathname();

    useEffect(() => {
        if (activeTab === "home") router.navigate("/(main)/home");
        if (activeTab === "practice") router.navigate("/(practice)/index");
        if (activeTab === "translate") router.navigate("/(main)/home");
        if (activeTab === "dictionary") router.navigate("/(dictionary)/index");
        if (activeTab === "profile") router.navigate("/(profile)/index");
    }, [activeTab]);
    
    return (
        <View style={{ flex: 1 }}>
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
    );
}
