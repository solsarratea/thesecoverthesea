import React, { Suspense, useRef, useEffect, useState } from 'react'
import customMaterial from './layerMaterial'
import * as THREE from 'three'
import { Html, useTexture } from '@react-three/drei'
import useCameraManager from '../hooks/useCameraMnager'
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
    scale,
  } = props

  const [newPosition] = useState({
    x: position.x ? position.x : 0,
    y: position.y ? position.y : 0,
    z: position.z ? position.z : 0,
  })

  var texture = useTexture(path)

  const meshRef = useRef()
  const [initTransform, setInitTransform] = useState(false)
  useEffect(() => {
    if (initTransform) return
    if (meshRef.current) {
      if (props.matrix) {
        meshRef.matrixAutoUpdate = false
        meshRef.current.applyMatrix4(props.matrix)
        meshRef.current.updateWorldMatrix()
      }
      setInitTransform(true)
    }
  }, [meshRef, props])

  return (
    <Suspense>
      <mesh
        ref={meshRef}
        position={
          new THREE.Vector3(
            newPosition.x * 10,
            newPosition.y * 10,
            newPosition.z * 10,
          )
        }
        scale={scale}
      >
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
