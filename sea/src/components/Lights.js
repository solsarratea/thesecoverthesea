import { useRef } from "react";
//import {  useHelper } from '@react-three/drei';

function Lights({ size, data }) {
  const { x, y, z } = size;

  const Light = (props) => {
    const light = useRef();
    //ref: https://github.com/mrdoob/three.js/blob/master/examples/webgl_lights_spotlight.html

    //useHelper(light, THREE.SpotLightHelper, props.color)

    return (
      <spotLight
        ref={light}
        {...props}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        castShadow
      />
    );
  };

  return (
    <>
      <ambientLight intensity={0.2}></ambientLight>
      <Light position={[0, y * 0.5, 1]} />
      <Light position={[-x * 0.5, -y * 0.45, z * 0.5]} />
      <Light position={[x * 0.5, -y * 0.45, -z * 0.5]} />
    </>
  );
}

export default Lights;
