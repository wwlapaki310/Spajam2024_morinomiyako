import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Link, Stack } from "expo-router";
import { Image } from "expo-image";

const Image1 = require("../../assets/images/howtouse.jpg");
const { width, height } = Dimensions.get("window");

export default function LightScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>説明ページ</Text>
      <Text style={styles.h2}>1. 使い方</Text>
      <Image source={Image1} style={styles.image} />
      <Text style={styles.paragraph}>
        暗い部屋で、スマホの画面の明るさをMAXにして、
        Lightウィンドウに表示される円型の蛍光に、ペットボトルを載せよう！
        ペットボトルがカラフルに輝き始めるよ！
      </Text>

      <Text style={styles.h2}>2.色の変更方法</Text>
      <Text style={styles.paragraph}>
        Settingsページから変更する。（詳細は美濃くんが記載）
      </Text>

      <Text style={styles.h2}>3.お勧めのペットボトル</Text>
      <Text style={styles.paragraph}>
        Settingsページから変更する。（福地くんが記載）
      </Text>

      <Text style={styles.h2}>4.原理</Text>
      <Text style={styles.paragraph}>
        物理学的な観点での説明を記載（福地くんが記載）
      </Text>

      {/* 普通の文章 */}
      <Text style={styles.paragraph}>
        This is a normal paragraph. Here, you can write longer text, and the
        style will be smaller and more suitable for body text.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    padding: 20,
  },
  h1: {
    fontSize: 32, // H1のサイズ
    fontWeight: "bold", // 太字
    marginBottom: 20, // 下にスペース
    color: "white",
  },
  h2: {
    fontSize: 24, // H2のサイズ
    fontWeight: "600", // 少し太い
    marginBottom: 15,
    color: "white",
  },
  paragraph: {
    fontSize: 16, // 普通の文章のサイズ
    lineHeight: 22, // 行の高さ
    marginBottom: 20,
    textAlign: "center", // テキストの配置
    color: "white",
  },
  image: {
    width: width, // 画像の幅
    height: 200, // 画像の高さ
    borderRadius: 10, // 画像の角を丸くする
    marginTop: 20,
  },
});