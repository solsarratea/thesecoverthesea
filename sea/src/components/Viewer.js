import { useRef, useEffect } from "react";
import { useThree  } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

function Viewer(props) {
    const { camera, gl, scene } = useThree();

    const ref = useRef();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);

            controls.minDistance = 3;
            controls.maxDistance = 2000;

            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );

    scene.background = new THREE.Color( 0x000000 );

  return (
    <>
      <mesh ref={ref} />
    </>
  );
}

export default Viewer;
