import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { colors, fontSizes, spacing } from '@/global/theme';
import BackButton from '@/components/BackButton';
import NavBar from '@/components/NavBar';
import { Link } from 'expo-router';
import VTBackground from '@/assets/images/vt_bg.svg';
import Slider from '@/components/Slider';
import { useSharedValue } from 'react-native-reanimated';
import AnimatedText from '@/components/animation/AnimatedText';

type Collection = {
  id: number;
  name: string;
  wordCount: number;
};

const collections: Collection[] = [
  { id: 1, name: 'Tất cả từ đã lưu', wordCount: 120 },
  { id: 2, name: 'Y tế', wordCount: 45 },
  { id: 3, name: 'fafa', wordCount: 10 },
];


const Index = () => {
  const [selectedId, setSelectedId] = useState<number | null>();
  // const [progress, setProgress] = useState(0);
  const progress = useSharedValue(0);
  const [isSelected, setIsSelected] = useState<Collection | null>();

  const handlePress = (id: number) => {
    // setSelectedId((prev) => (prev === id ? null : id));
    // setProgress(0);
    // let selectedItem = collections.find(item => item.id === id);

    // setIsSelected((prev) => (prev === selectedItem ? null : selectedItem));

    setSelectedId((prev) => (prev === id ? null : id));
    progress.value = 0;
    let selectedItem = collections.find((item) => item.id === id);
    setIsSelected((prev) => (prev === selectedItem ? null : selectedItem));
  };


  return (
    <SafeAreaView style={styles.container}>
      <VTBackground
        width="100%"
        height="100%"
        style={{ position: 'absolute', opacity: 0.4 }}
        preserveAspectRatio="xMidYMid slice"
      />
      <View style={styles.main}>
        <BackButton color={colors.primary600} />

        <View style={{ gap: spacing.sm, marginBottom: spacing.md * 1.5 }}>
          <Text style={styles.word}>Luyện tập</Text>
          <Text style={{ fontSize: fontSizes.xl, fontWeight: 600, color: colors.primary500 }}>Chọn bộ sưu tập để luyện tập</Text>
        </View>

        <View>
          {collections.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.collectionCard,
                  { backgroundColor: selectedId === item.id ? colors.primary400 : colors.gray50 },
                ]}
                onPress={() => handlePress(item.id)}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: selectedId === item.id ? 'white' : 'black',
                    fontWeight: '600',
                  }}
                >
                  {item.name} ({item.wordCount} từ)
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ marginTop: spacing.md }}>
          {isSelected && (
            <View style={{ gap: spacing.sm }}>
              <View>
                <Text style={{ fontSize: fontSizes.xl, color: colors.primary600, fontWeight: 600 }}>Số lượng từ:</Text>
              </View>
              <View
                style={{
                  marginTop: spacing.sm,
                  flexDirection: 'row',
                  gap: spacing.sm,
                  alignItems: 'center',
                  alignSelf: 'stretch',
                }}>

                <Slider
                  maxValue={isSelected.wordCount}
                  onChange={(val) => (progress.value = val)}
                />
                <AnimatedText progress={progress} max={isSelected.wordCount} />
              </View>
            </View>
          )}
        </View>

        <View>
          {isSelected && (
            <Link
              href={{
                pathname: "./mode",
                params: { name: isSelected?.name },
              }}
              asChild
            >
              <TouchableOpacity style={{
                ...styles.button,
                width: 200,
                backgroundColor: colors.primary500,
                alignSelf: 'center',
                paddingHorizontal: spacing.sm * 1.4,
                paddingVertical: spacing.sm * 1.2,
                borderRadius: 6
              }}>
                <Text style={{ textAlign: 'center', fontSize: fontSizes.md, color: colors.gray100, fontWeight: 700 }}>Xác nhận</Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
      <NavBar />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#2C6AEF"
    // backgroundColor: colors.primary200
    backgroundColor: colors.gray50
  },
  main: {
    padding: spacing.md,
    flex: 1,
    gap: spacing.sm
  },
  word: {
    fontSize: fontSizes["4xl"],
    fontWeight: 800,
    color: colors.primary600
  },
  collectionCard: {
    backgroundColor: colors.gray50,
    marginVertical: spacing.sm,
    padding: spacing.sm * 1.3,

    borderRadius: 10,
    borderWidth: .2,
    borderColor: colors.gray400,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 2,
  },
  button: {
    marginTop: spacing.md,
    borderWidth: .2,
    borderColor: colors.gray400,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 4,
  }
});