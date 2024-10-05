import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";

const PlaceholderImage = require("../../assets/images/background-image2.jpg");
const { width, height } = Dimensions.get("window");

export default function Index() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // バックグラウンド再生の設定
  async function configureAudioMode() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true, // バックグラウンド再生を有効にする
      playsInSilentModeIOS: true, // iOSでサイレントモードでも再生
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }

  // サウンドをロードして再生する関数
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/music/takibi.mp3"),
      { shouldPlay: false, isLooping: true } // 自動再生はしない
    );
    setSound(sound);
    if (isPlaying) {
      await sound.playAsync(); // 明示的に再生する
    }
  }

  useEffect(() => {
    configureAudioMode(); // 音楽モードを設定
    playSound(); // 音楽を再生

    // コンポーネントがアンマウントされたときにサウンドを解放
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: width, // スクリーンの幅に合わせる
    height: height, // スクリーンの高さに合わせる
    resizeMode: "cover", // 画像を全体にカバーさせる
    borderRadius: 18,
  },
});
