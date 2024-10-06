import { useContext } from "react";
import { DataContext } from "./_layout";
import AnimatedCircleSample from "../../components/AnimatedCircleSample";
import AnimatedCircle from "../../components/AnimatedCircle";


export default function LightScreen() {
  const animationDef = useContext(DataContext);
  return (
    // <AnimatedCircleSample />
    <AnimatedCircle animationDef={animationDef} />
  );
}
