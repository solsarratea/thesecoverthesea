import React, { Suspense, useEffect, useRef, useState } from 'react'
import customMaterial from './layerMaterial'
import * as THREE from 'three'
import { Html, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function Layer(props) {
  const { colorIn, colorOut, deltaColor, deltaSmooth, mix, path } = props

  const meshRef = useRef()

  useEffect(() => {
    if (meshRef.current) {
      if (props.matrix) {
        meshRef.matrixAutoUpdate = false
        meshRef.current.applyMatrix4(props.matrix)
        meshRef.current.updateWorldMatrix()
      } else {
        const { scale, position } = props

        const newPosition = {
          x: position.x ? position.x : 0,
          y: position.y ? position.y : 0,
          z: position.z ? position.z : 0,
        }

        meshRef.current.position.set(
          newPosition.x,
          newPosition.y,
          newPosition.z,
        )
        meshRef.current.scale.set(scale)
      }
    }
  }, [meshRef, props])

  var texture = useTexture(path)

  return (
    <Suspense>
      <mesh ref={meshRef}>
        <planeGeometry
          attach="geometry"
          args={[
            (30 * texture.source.data.naturalWidth) /
              texture.source.data.naturalHeight,
            30,
          ]}
        />
        <shaderMaterial
          needsUpdate={false}
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
  )
}

export default function Layers(props) {
  const layerRef = useRef()
  const { author, artwork, data } = props
  const [onMe, setOnMe] = useState(false)

  const [hovered, setHover] = useState(false)

  const hover = (e) => {
    e.stopPropagation()
    setHover(true)
  }
  const unhover = (e) => {
    e.stopPropagation()
    setHover(false)
  }

  const activeName = useCameraManager((state) => state.name)
  const set = useCameraManager((state) => state.set)
  const [name] = useState(`${author}-${artwork}`)

  useEffect(() => {
    if (name !== activeName) {
      setOnMe(false)
    }
  }, [activeName, name])

  return (
    <mesh
      ref={layerRef}
      position={props.position}
      onPointerOver={hover}
      onPointerOut={unhover}
      onClick={(e) => {
        if (onMe) {
          //props.updateControls(props.position, null)
          setOnMe(false)
        } else {
          props.updateControls(props.position, true)
          setOnMe(true)
          set('name', name)
        }
      }}
    >
      {data.map((props) => {
        return (
          <Layer
            {...props}
            scale={hovered || onMe ? 1.5 : 1}
            key={`${author}-${artwork}-layer-${props.id}`}
          />
        )
      })}
      {(hovered || onMe) && props.author !== 'demo' && (
        <Html position-y={-18} transform scale={4}>
          <div className="layer-content">Posted by {props.author}</div>
        </Html>
      )}
    </mesh>
  )
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
