import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, Camera, CameraType } from "expo-camera";
import NavBar from "@/components/NavBar";
import { colors, fontSizes, spacing } from "@/global/theme";
import Flip from '@/assets/images/flip.svg';
import Search from "@/components/Searchbar";
import { Searchbar } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Index = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [mode, setMode] = useState<"camera" | "text">("camera");
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [text, setText] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarAnim = useRef(new Animated.Value(-width * 0.8)).current;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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
      Animated.timing(sidebarAnim, {
        toValue: -width * 0.8,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setSidebarOpen(false));
    } else {
      setSidebarOpen(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginLeft: 10 }]} onPress={toggleSidebar}>
            <MaterialIcons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          {mode === "camera" ? (
            <View style={{ flex: 1 }}>
              <Text style={styles.cameraTitle}>
                Đưa tay vào camera để bắt đầu nhé!
              </Text>

              <CameraView
                style={styles.camera}
                facing={facing}
              >
                {mode === "camera" && (
                  <TouchableOpacity style={styles.cameraSwitchBtn} onPress={toggleCameraType}>
                    <Text style={styles.buttonText}>
                      <Flip width={18} height={18} />
                    </Text>
                  </TouchableOpacity>
                )}
              </CameraView>
            </View>
          ) : (
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
          )}


        </View>
        <NavBar />

        {/* Sidebar overlay */}
        {sidebarOpen && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={toggleSidebar}
            activeOpacity={1}
          />
        )}
        <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
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
    backgroundColor: colors.primary200,
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
    width: width * 0.8,
    backgroundColor: colors.primary800,
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
  },
});
