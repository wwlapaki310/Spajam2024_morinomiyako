type ColorValue = {
  // 0-1
  position: number;
  hue: number;
}

type AnimationDef = {
  duration: number;
  music: string;
  major: ColorValue[];
  minor?: ColorValue[];
}