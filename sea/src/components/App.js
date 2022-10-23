import Postcards from "./Postcards.js";
import Ocean from "./Ocean.js";
import CustomEffects from "./CustomEffects";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useState, useRef } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { hot } from "react-hot-loader/root";
import PositionalSound from "./Audio.js";
import useEnvManager from "./useEnvManager.js";
const DisableRender = () => useFrame(() => null, 1000);

const audioData = {
  "audio1":{
      position: [0,0, 0],
      path:  '/audio/ocean.mp3',
      refdistance:50.,
      cone:{
          outer: 360,
          inner: 360,
          gain:.1
      },
      rotation: [0.,Math.PI/2, 0.],
      maxdistance: 500.,
      distancemodel: "exponential",
      volume:1.
  },
};


function App({loaded}) {
  const controls = useRef();
  const [modalOn, ] = useState({
    value: false,
  });
  const envPath = useEnvManager(state => state.envPath);

  return(
    <Suspense fallback={null}>
      <Canvas
        dpr={[2, 1]}
        shadows
        camera={{ far: 3000, position: new THREE.Vector3(-67, -20, -0) }}
      >
        {modalOn.value ? <DisableRender /> : null}
        <Postcards />
        <Environment
          scale={1}
          background={true}
          path={envPath}
          files={[`px.png`, `nx.png`, `py.png`, `ny.png`, `pz.png`, `nz.png`]}
        />
          <Ocean />
          <PositionalSound id={"audio1"} data={audioData} />
      
        <OrbitControls maxDistance={790} maxPolarAngle={1.62} ref={controls} />
        <CustomEffects />
      </Canvas>
    </Suspense>
  );
}

export default hot(App);

//<UI disableControl={setModalOn} />