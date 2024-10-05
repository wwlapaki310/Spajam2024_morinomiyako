import { StyleSheet, Text, View, Image } from "react-native";
import { Link, Stack } from "expo-router";
import AnimatedCircle from "../../components/AnimatedCircle";

export default function LightScreen() {
  return (
    <View style={styles.container}>
      {/* H1スタイル */}
      <Text style={styles.h1}>This is H1 Heading</Text>

      {/* H2スタイル */}
      <Text style={styles.h2}>This is H2 Heading</Text>

      {/* 普通の文章 */}
      <Text style={styles.paragraph}>
        This is a normal paragraph. Here, you can write longer text, and the
        style will be smaller and more suitable for body text.
      </Text>

      {/* 画像の表示 */}
      <Image
        source={{ uri: "https://example.com/your-image.jpg" }} // 画像のURLを指定
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
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
    width: 200, // 画像の幅
    height: 200, // 画像の高さ
    borderRadius: 10, // 画像の角を丸くする
    marginTop: 20,
  },
});
