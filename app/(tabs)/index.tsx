import { Text, View, StyleSheet, StatusBar, Dimensions,ImageBackground } from "react-native";
import { Link, Stack } from "expo-router";
import { Image } from "expo-image";

const PlaceholderImage = require("../../assets/images/background-image2.jpg");
const { width, height } = Dimensions.get("window");

export default function Index() {
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
  text: {
    color: "white", // テキストの色
    fontSize: 32, // テキストのサイズ
    fontWeight: "bold", // 太字
  },
});
