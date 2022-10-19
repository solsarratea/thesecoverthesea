import React, { Suspense, useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import { Water } from "three-stdlib";
import * as THREE from "three";
extend({ Water });

function Ocean() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  window.cam = useThree((state) => state.camera);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "textures/waternormals.jpeg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);

  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(10, 10, 10),
      sunColor: 0x0f0f0f,
      waterColor: 0xf0e5f,
      distortionScale: 20.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals, gl.encoding]
  );
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta)
  );
  return (
    <Suspense>
      <water
        ref={ref}
        args={[geom, config]}
        rotation-x={-Math.PI / 2}
        position-y={-50}
      />
    </Suspense>
  );
}

export default Ocean;
