import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Linking,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, Camera, CameraType } from "expo-camera";
import NavBar from "@/components/NavBar";
import { colors, fontSizes, spacing } from "@/global/theme";
import Flip from '@/assets/images/flip.svg';
import Search from "@/components/Searchbar";
import { Searchbar } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInRight, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useWalkthroughStep } from "react-native-interactive-walkthrough";
import TranslateScreenOverlay from "@/components/walkthrough/TranslateScreenOverlay";
import TranslateScreen2Overlay from "@/components/walkthrough/TranslateScreenOverlay2";
import TranslateScreen3Overlay from "@/components/walkthrough/TranslateScreenOverlay3";
import TranslateScreen4Overlay from "@/components/walkthrough/TranslateScreenOverlay4";
import TranslateScreen5Overlay from "@/components/walkthrough/TranslateScreenOverlay5";

import HomeIcon from '@/assets/images/home.svg';
import Book from '@/assets/images/book.svg';
import SearchIcon from '@/assets/images/search.svg';
import Profile from '@/assets/images/profile.svg';
// import Wave from '@/assets/images/wave.svg';
import Scan from '@/assets/images/scan.svg';
import { useNav } from "@/context/NavContext";
import { Link } from "expo-router";
import { useFonts } from "expo-font";

const ICON_SIZE = 20;

const { width } = Dimensions.get("window");

const Index = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(true);
  const [facing, setFacing] = useState<CameraType>('back');
  const [mode, setMode] = useState<"camera" | "text">("camera");
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [text, setText] = useState("");

  const [fontsLoaded] = useFonts({
    ...MaterialIcons.font,
  });

  const { activeTab, setActiveTab } = useNav();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarX = useSharedValue(-width * 0.8);
  const overlayOpacity = useSharedValue(0);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  const toggleCameraType = () => {
    setFacing((prev: CameraType) =>
      prev === 'back' ? 'front' : 'back'
    );
  };

  const addLog = (text: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog((prev) => [`[${timestamp}] ${text}`, ...prev]);
  };

  const toggleSidebar = () => {
    if (sidebarOpen) {
      // close sidebar
      sidebarX.value = withTiming(-width * 0.8, { duration: 250 });
      overlayOpacity.value = withTiming(0, { duration: 250 });
      setSidebarOpen(false);
    } else {
      // open sidebar
      sidebarX.value = withTiming(0, { duration: 250 });
      overlayOpacity.value = withTiming(1, { duration: 250 });
      setSidebarOpen(true);
    }
  };

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sidebarX.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const { onLayout: step18OnLayout, goTo: goTo18, start: startStep18 } = useWalkthroughStep({
    number: 18,
    fullScreen: false,
    OverlayComponent: TranslateScreenOverlay,
  });

  const { onLayout: step19OnLayout, stop } = useWalkthroughStep({
    number: 19,
    fullScreen: false,
    OverlayComponent: TranslateScreen3Overlay,
  });

  const { onLayout: step20OnLayout } = useWalkthroughStep({
    number: 20,
    fullScreen: false,
    OverlayComponent: TranslateScreen4Overlay,
  });

  const { onLayout: step21OnLayout } = useWalkthroughStep({
    number: 21,
    fullScreen: false,
    maskAllowInteraction: true,
    OverlayComponent: TranslateScreen5Overlay,
  });


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    goTo18(18);
  }, [goTo18, startStep18]);


  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  // if (hasPermission === false) {
  //   return (
  //     <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
  //       <Ionicons name="camera-off" size={64} color="#666" />
  //       <Text style={{ fontSize: 16, marginTop: 12, color: "#444", textAlign: "center" }}>
  //         Ứng dụng cần quyền truy cập máy ảnh để sử dụng tính năng này.
  //       </Text>
  //       <TouchableOpacity
  //         style={{
  //           marginTop: 20,
  //           backgroundColor: "#2C6AEF",
  //           paddingHorizontal: 20,
  //           paddingVertical: 12,
  //           borderRadius: 8,
  //         }}
  //         onPress={() => Linking.openSettings()}
  //       >
  //         <Text style={{ color: "#fff", fontWeight: "bold" }}>Mở Cài đặt</Text>
  //       </TouchableOpacity>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <SafeAreaView style={styles.container}
      >
        <View style={styles.header}>

          {/* <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setMode((prev) => (prev === "camera" ? "text" : "camera"))
            }
          >
            {mode === "camera" ? (
              <MaterialIcons name="keyboard" size={24} color="#fff" />
            ) : (
              <Ionicons name="camera" size={24} color="#fff" />
            )}
          </TouchableOpacity> */}
          <Animated.View
            entering={FadeInRight.delay(200).duration(500).springify()}
          >
            <TouchableOpacity
              style={[styles.button, { marginLeft: 10 }]}
              onPress={toggleSidebar}
              onLayout={step20OnLayout}
            >
              <MaterialIcons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View
          entering={FadeInDown.delay(300).duration(500).springify()}
          style={styles.main}
        >
          {/* {mode === "camera" ? (
            <View style={{ flex: 1 }} >
              <Text style={styles.cameraTitle}>
                Đưa tay vào camera để bắt đầu nhé!
              </Text>

              <CameraView
                style={styles.camera}
                facing={facing}
                onLayout={step16OnLayout}

              >
                {mode === "camera" && (
                  <TouchableOpacity
                    style={styles.cameraSwitchBtn}
                    onPress={toggleCameraType}
                    onLayout={step18OnLayout}
                  >
                    <Text style={styles.buttonText}>
                      <Flip width={18} height={18} />
                    </Text>
                  </TouchableOpacity>
                )}
              </CameraView>
            </View>
          )
          : (
            <View style={styles.textMode}>
              <View style={styles.modelPlaceholder}>
                <Image
                  source={require('@/assets/images/3d.png')}
                  style={{
                    width: 460,
                    height: 460,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Nhập văn bản..."
                placeholderTextColor={colors.gray500}
              />
            </View>
          )} */}

          <View style={{ flex: 1 }} >
            {/* <Text style={styles.cameraTitle}>
              Đưa tay vào camera để bắt đầu nhé!
            </Text> */}
            <CameraView
              style={styles.camera}
              //facing={facing}
              onLayout={step18OnLayout}

            >
              {mode === "camera" && (
                <TouchableOpacity
                  style={styles.cameraSwitchBtn}
                  onPress={toggleCameraType}
                  onLayout={step19OnLayout}
                >
                  <Text style={styles.buttonText}>
                    <Flip width={18} height={18} />
                  </Text>
                </TouchableOpacity>
              )}
            </CameraView>
          </View>

        </Animated.View>
        <View style={{ ...styles.containerNav }}>
          <Link href="/(main)/home" asChild>
            <TouchableOpacity onPress={() => setActiveTab("home")}>
              {/* <View style={{ backgroundColor: activeTab === "home" ? "red" : "transparent", ...styles.wrapper }}> */}
              <View style={styles.wrapper}>
                <HomeIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  stroke={activeTab === "home" ? colors.primary400 : colors.gray500}
                  fill={activeTab === "home" ? colors.primary400 : colors.gray500}
                />
                <Text style={{ color: activeTab === "home" ? colors.primary400 : colors.gray500, ...styles.text }}>Trang chủ</Text>
              </View>
            </TouchableOpacity>
          </Link>

          {/* <Link href="/(practice)" asChild>
                <TouchableOpacity style={styles.button} onPress={() => setActiveTab("practice")}>
                    <View style={styles.wrapper}>
                        <Book
                            width={ICON_SIZE}
                            height={ICON_SIZE}
                            stroke={activeTab === "practice" ? colors.primary400 : colors.gray500}
                        />
                        <Text style={{ color: activeTab === "practice" ? colors.primary400 : colors.gray500, ...styles.text }}>Luyện tập</Text>
                    </View>
                </TouchableOpacity>
            </Link> */}

          {/* <Button style={styles.button}>
                <Wave width={ICON_SIZE} height={ICON_SIZE} />
            </Button> */}

          <Link href="/(translate)" asChild>
            <TouchableOpacity
              style={styles.translateBtn}
              onPress={() => setActiveTab("translate")}
            >
              <View style={{ ...styles.wrapper, }}>
                <Scan
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  stroke={activeTab === "translate" ? colors.primary400 : colors.gray500}
                />
                <Text style={{ color: activeTab === "translate" ? colors.primary400 : colors.gray500, ...styles.text }}>
                  Phiên dịch
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/(dictionary)" asChild>
            <TouchableOpacity
              onPress={() => setActiveTab("dictionary")}
            // onLayout={step8OnLayout}
            >
              <View style={{ ...styles.wrapper, }}>
                <SearchIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  stroke={activeTab === "dictionary" ? colors.primary400 : colors.gray500}
                />
                <Text style={{ color: activeTab === "dictionary" ? colors.primary400 : colors.gray500, ...styles.text }}>Từ điển</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/(profile)" asChild>
            <TouchableOpacity
              onLayout={step21OnLayout}
              onPress={() => setActiveTab("profile")}>
              <View style={{ ...styles.wrapper }}>
                <Profile
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  stroke={activeTab === "profile" ? colors.primary400 : colors.gray500}
                />
                <Text style={{ color: activeTab === "profile" ? colors.primary400 : colors.gray500, ...styles.text }}>Tài khoản</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        {sidebarOpen && (
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={toggleSidebar}
          >
            <Animated.View style={[styles.overlay, overlayStyle]} />
          </TouchableOpacity>
        )}
        <Animated.View style={[styles.sidebar, sidebarStyle]}>
          <Text style={styles.logTitle}>Lịch sử dịch</Text>
          <FlatList
            data={log}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.logItem}>{item}</Text>}
          />
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  button: {
    backgroundColor: "#2C6AEF",
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end'
  },
  cameraSwitchBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    aspectRatio: 1,
    width: 40,
    backgroundColor: colors.gray50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
  },
  main: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },

  cameraTitle: {
    marginTop: spacing.lg,
    textAlign: 'center',
    fontSize: fontSizes.md,
    fontWeight: 500,
    color: colors.primary600
  },

  camera: {
    marginTop: spacing.md,
    width: "90%",
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.5,
    backgroundColor: '#2C6AEF',
    padding: 20,
    zIndex: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  textMode: {
    height: "90%",
    width: "100%",
    padding: 20,
    justifyContent: "flex-start",
  },
  input: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray500,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#000",
  },
  modelPlaceholder: {
    flex: 1,
    backgroundColor: colors.gray200,
    marginTop: 20,
    borderWidth: .5,
    borderColor: "#444",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden'
  },
  logSection: {
    maxHeight: 150,
    borderTopWidth: 1,
    borderColor: "#333",
    padding: 10,
  },
  logTitle: {
    color: "#fff",
    fontSize: fontSizes.lg,
    fontWeight: "bold",
    marginBottom: 5,
  },
  logItem: {
    color: "#ccc",
    fontSize: 12,
  }, containerNav: {
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
    height: 70
  },
  translateBtn: {
    // position: 'relative',
    // bottom: 20,
    // backgroundColor: colors.gray50,
    // padding: spacing.sm,
    // borderRadius: 999,
    // borderColor: '#ddd',
    // borderWidth: 1
  },
  wrapper: {
    borderRadius: 10,
    padding: spacing.sm,
    justifyContent: "center",
    alignItems: 'center'
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  text: {
    fontSize: fontSizes.sm,
    fontWeight: 500
  },
  link: {
    position: 'absolute'
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // or your theme background
  },
});
