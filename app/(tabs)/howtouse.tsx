import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { Image } from "expo-image";

const Image1 = require("../../assets/images/howtouse.jpg");
const Image2 = require("../../assets/images/drink_recommend.jpg");
const { width, height } = Dimensions.get("window");

export default function LightScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.h1}>説明ページ</Text>

        <Text style={styles.h2}>1. 使い方</Text>
        <Image source={Image1} style={styles.image} />
        <Text style={styles.paragraph}>
          暗い部屋で、スマホの画面の明るさをMAXにして、Lightウィンドウに表示される円型の蛍光に、ペットボトルを載せよう！ペットボトルがカラフルに輝き始めるよ！
        </Text>

        <Text style={styles.h2}>2. 色の変更方法</Text>
        <Text style={styles.paragraph}>
          Settingsページから変更可能です。色を2色選択すると、グラデーションで変化します。
        </Text>

        <Text style={styles.h2}>3. お勧めのペットボトル</Text>
        <Image source={Image2} style={styles.image} />

        <Text style={styles.h2}>4. 原理</Text>
        <Text style={styles.paragraph}>
          スマホの画面が放つ光は、通常の環境光に比べて比較的強い光を放っています。ペットボトルはこの光を受けて内部で拡散し、見た目には光源のように輝きます。この際、光の強度は次の式で表されます。
        </Text>
        <Text style={styles.formula}>I = P / (4πr²)</Text>
        <Text style={styles.paragraph}>
          ここで、Iは光の強度、Pは光源のパワー、rは光源からの距離です。スマホの画面から放たれる光がペットボトル内で反射し、多くの方向に光が広がるため、ペットボトルがランタンのように輝きます。また、ペットボトルの内部は、光が屈折や反射する際に、その光の波長によって色が変化するため、カラフルに見える効果が生じます。
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
    color: "white",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  formula: {
    fontSize: 18,
    fontWeight: "bold",
    color: "yellow",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: width - 40, // 画面の幅に基づく調整
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});
