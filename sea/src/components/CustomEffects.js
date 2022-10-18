import {
  EffectComposer,
  HueSaturation,
  Sepia,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function CustomEffects() {
  return (
    <>
      <EffectComposer>
        <HueSaturation
          blendFunction={BlendFunction.NORMAL} // blend mode
          hue={0} // hue in radians
          saturation={0.6} // saturation in radians
        />
        <Sepia
          intensity={1} // sepia intensity
          blendFunction={BlendFunction.MULTIPLY} // blend mode
        />
      </EffectComposer>
    </>
  );
}

export default CustomEffects;
