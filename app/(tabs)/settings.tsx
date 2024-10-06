import { StyleSheet, Text, View, Switch } from "react-native";
import ColorAnimationUI from "@/components/ColorAnimationUI";
import AnimationEditor from "@/components/AnimationEditor";

interface SettingsProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}

export default function SettingsScreen({
  isPlaying,
  setIsPlaying,
}: SettingsProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Settings</Text>
      <Text style={styles.h2}>色の変更</Text>
      <Text style={styles.text}>
        実装内容を持ってくる。（美濃くん）
      </Text>
      {/* <ColorAnimationUI /> */}
      <AnimationEditor />

      {/* <Text style={styles.text}>焚き火音</Text>
      <Switch
        value={isPlaying}
        onValueChange={(value) => setIsPlaying(value)}
        trackColor={{ false: "#767577", true: "#81b0ff" }} // オフとオンのトグル背景色
        thumbColor={isPlaying ? "#f5dd4b" : "#f4f3f4"} // トグルスイッチの色
      /> */}
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
  text: {
    fontSize: 16, // テキストサイズ
    color: "white", // テキストの色を白に
    marginBottom: 20, // テキストとスイッチの間のスペース
  },
});
