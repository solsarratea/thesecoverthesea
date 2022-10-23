import React, { Suspense, useRef, useState } from "react";
import customMaterial from "./layerMaterial";
import * as THREE from "three";
import { Html, useTexture } from "@react-three/drei";
    
function Layer(props) {
  const {
    colorIn,
    colorOut,
    deltaColor,
    deltaSmooth,
    mix,
    path,
    rotation,
    position,
    scale
  } = props;
  
  const [newPosition,] =useState( {
      x: (position.x ? position.x : 0),
      y: (position.y ? position.y : 0),
      z: (position.z ? position.z : 0)
    });
  
  const [newRotation,] = useState(() => {
    if (!rotation) return {x:0, y:0, z:0}
    return {
      x: (rotation["_x"] ? rotation["_x"] : 0),
      y: (rotation["_y"] ? rotation["_y"] : 0),
      z: (rotation["_z"] ? rotation["_z"] : 0),
    }
  });
  
  var texture = useTexture(path);
  
  return (
    <Suspense>
      <mesh
        rotation={ new THREE.Euler(newRotation.x, newRotation.y, newRotation.z ,'XYZ')}
        position={new THREE.Vector3(newPosition.x*10, newPosition.y*10, newPosition.z*10)}
        scale={scale}>
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
  const { author, artwork, data } = props;
  
  const [hovered, setHover] = useState(false);
  const [scale, setScale] = useState(1);

  const hover = e => { e.stopPropagation(); setHover(true);setScale(1.5) }
  const unhover = e => { e.stopPropagation(); setHover(false);setScale(1.) }

  return (
    <group ref={layerRef} position={props.position} onPointerOver={hover} onPointerOut={unhover} >
      {data.map((props) => {
        return <Layer {...props} scale={scale}  key={`${author}-${artwork}-layer-${props.id}`} />;
      })}
      {hovered && props.author !== 'demo' && (
          <Html position-y={-20} scale={props.position.z} >
          <div className="layer-content">

              Posted by {props.author}
            </div>
          </Html>
      )}
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