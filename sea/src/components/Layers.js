import React, { Suspense, useRef } from "react";
import customMaterial from "./layerMaterial";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
    
function Layer(props) {
  const {
    colorIn,
    colorOut,
    deltaColor,
    deltaSmooth,
    mix,
    path,
    position } = props;
  
    //rotation={ new THREE.Vector3(rotation[0], rotation[1], rotation[2])}

  var texture = useTexture(path);
   
  return (
    <Suspense>
      <mesh
        position={new THREE.Vector3(position.x*10., position.y*10, position.z*10)}>
        <planeGeometry
          attach="geometry"
          args={[
            (30 * texture.source.data.naturalWidth) /
              texture.source.data.naturalHeight,
            30,
          ]}
        />
        <shaderMaterial needsUpdate={false}
          transparent={true}
          attach="material"
          args={[
            customMaterial({
              texture,
              colorIn,
              colorOut,
              deltaColor,
              deltaSmooth,
              mix,
            }),
          ]}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Suspense>
  );
}

export default function Layers(props) {
  const layerRef = useRef();
  const { author, data } = props;

  return (
    <group ref={layerRef} position={props.position}>
      {data.map((props) => {

        return <Layer {...props} key={`${author}-layer-${props.id}`} />;
      })}
       </group>
  );
}


/*
import { useFrame } from "@react-three/fiber";
  useFrame(({ clock }) => {
    if (layerRef.current) {
      layerRef.current.rotation.y += 0.01;
      layerRef.current.rotation.x += 0.005;
      layerRef.current.position.y += Math.sin(clock.getDelta() * 0.5) * 0.1;
      layerRef.current.position.z -=
      Math.cos(layerRef.current.position.x + clock.getDelta()) * 0.1;
    }
});
 */