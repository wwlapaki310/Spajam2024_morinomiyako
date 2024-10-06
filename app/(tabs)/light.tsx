import { useContext } from "react";
import { DataContext, SetTabBarHiddenContext } from "./_layout";
import AnimatedCircleSample from "../../components/AnimatedCircleSample";
import AnimatedCircle from "../../components/AnimatedCircle";


export default function LightScreen() {
  const animationDef = useContext(DataContext);
  const setTabBarHidden = useContext(SetTabBarHiddenContext);
  return (
    // <AnimatedCircleSample />
    <AnimatedCircle animationDef={animationDef} setTabBarHidden={setTabBarHidden} />
  );
}
