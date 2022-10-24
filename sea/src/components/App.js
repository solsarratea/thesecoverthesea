import Postcards from "./Postcards.js";
import Ocean from "./Ocean.js";
import CustomEffects from "./CustomEffects";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useState, useRef,useMemo, useEffect } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { hot } from "react-hot-loader/root";
import PositionalSound from "./Audio.js";
import useEnvManager from "./useEnvManager.js";
import CameraControls from 'camera-controls'
import { useThree } from "@react-three/fiber";
import Viewer from './Viewer.js'

CameraControls.install({ THREE })

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => {
    const controls = new CameraControls(camera, gl.domElement);
    controls.maxZoom = 8;
    controls.minZoom = 1.;
    return controls;
  },[]);
 
  controls.mouseButtons.wheel = CameraControls.ACTION.ZOOM;


  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 50) : pos.set(0, 0, -10)
    zoom ? look.set(focus.x, focus.y, focus.z - 50) : look.set(0, 0, 0)
  
    state.camera.position.lerp(pos, 0.35)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, Math.min(state.camera.position.y,1), state.camera.position.z, look.x, look.y, look.z, true)
    controls.azimuthAngle += 5 * delta * THREE.MathUtils.DEG2RAD;
 
    return controls.update(delta)
  })


}


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

  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})

  const updateControls = (focusRef, newZoom) => {
    const z = newZoom ? newZoom : !zoom;
    setZoom(newZoom);
    setFocus(focusRef);
  };

  return(
    <Suspense fallback={null}>
      <Canvas
        dpr={[2, 1]}
        shadows
        camera={{ far: 3000, position: new THREE.Vector3(0, 0, 0) }}
      >
        {modalOn.value ? <DisableRender /> : null}
          <Postcards updateControls={updateControls} />
          <Ocean />
          <PositionalSound id={"audio1"} data={audioData} />
          <Controls zoom={zoom} focus={focus} />
          <Environment
          scale={1}
          background={true}
          path={envPath}
          files={[`px.png`, `nx.png`, `py.png`, `ny.png`, `pz.png`, `nz.png`]}
        />
      
        <CustomEffects />
      </Canvas>
    </Suspense>
  );
}

export default hot(App);
