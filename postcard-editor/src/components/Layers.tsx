import React, { Suspense, useEffect, useRef, useState } from "react";
import customMaterial, { LayerUniforms } from "./layerMaterial";
import useLayersManager from "../hooks/useLayersManager";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, PivotControls } from "@react-three/drei";
import "../styles/layers.css";
import { RGBAColor } from "../types/common";

export type LayersProps = {
  size: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  className: string;
};

export type LayerProps = {
  colorIn: RGBAColor;
  colorOut: RGBAColor;
  deltaColor: number;
  deltaSmooth: number;
  id: number;
  pivotId: number;
  mix: number;
  path: string;
  pivotControls: boolean;
};

function Layer(props: LayerProps) {
  const {
    colorIn,
    colorOut,
    deltaColor,
    deltaSmooth,
    id,
    mix,
    path,
    pivotControls,
  } = props;

  var texture = useTexture(path);
  const setId = useLayersManager((state: any) => state.setId);
  const setPivotId = useLayersManager((state: any) => state.setPivotId);
  const meshRef = useRef<any>();
  const pivotRef = useRef<any>();
  const { scene } = useThree();

  useEffect(() => {
    if (pivotRef.current) {
      setPivotId(id, pivotRef.current.id);
      const pc = scene.getObjectById(pivotRef.current.id) as any;
      (window as any).m = pc;
    }
  }, [pivotRef.current]);

  return (
    <Suspense>
      <PivotControls
        ref={pivotRef}
        visible={pivotControls}
        rotation={[0, 0, 0]}
        anchor={[0, 0, 0]}
        scale={75}
        depthTest={false}
        fixed
        lineWidth={2}
      >
        <mesh
          ref={meshRef}
          name={`layer-${props.id}`}
          position={new THREE.Vector3(0, 0, -id * 0.2)}
          onClick={() => {
            setId(id);
          }}
        >
          <planeGeometry
            attach="geometry"
            args={[
              (4 * texture.source.data.naturalWidth) /
                texture.source.data.naturalHeight,
              4,
            ]}
          />
          <shaderMaterial
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
      </PivotControls>
    </Suspense>
  );
}

function downloadURI(uri: string, name: string, id: string) {
  var element = document.getElementById(id);
  if (element) {
    const link = element as HTMLAnchorElement;
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
  }
}

function DownloadAsJSON() {
  const { scene } = useThree();
  const downloadJSON = useLayersManager((state: any) => state.downloadJSON);
  const setBoolean = useLayersManager((state: any) => state.setBoolean);
  const state = useLayersManager((state: any) => state);

  const exportScene = () => {
    const layersData = state.layers.map((layer: LayerProps) => {
      const { id, pivotId } = layer;
      const mesh = scene.getObjectByName(`layer-${id}`) as THREE.Mesh;
      const pc = scene.getObjectById(pivotId);
      var matrix = null;
      if (pc) {
        matrix = pc.matrix as THREE.Matrix4;
      }

      return {
        ...layer,
        position: mesh.position,
        rotation: mesh.rotation,
        matrix: matrix,
      };
    });

    return {
      layersData,
      lightMode: state.light,
    };
  };

  useEffect(() => {
    if (downloadJSON) {
      const data = exportScene();
      var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(data, null, 4));
      downloadURI(dataStr, "postcard-data.json", "download-json");
      setBoolean("downloadJSON", false);
    }
  }, [downloadJSON]);
  return <></>;
}

function TakeScreenshot() {
  const { gl, scene, camera } = useThree();
  const takeScreenshot = useLayersManager((state: any) => state.takeScreenshot);
  const setBoolean = useLayersManager((state: any) => state.setBoolean);

  useEffect(() => {
    if (takeScreenshot) {
      gl.render(scene, camera);
      const screenshot = gl.domElement.toDataURL();
      downloadURI(screenshot, "postcard-view.png", "download-image");
      setBoolean("takeScreenshot", false);
    }
  }, [takeScreenshot]);

  return <></>;
}

function ResetCamera() {
  const { camera } = useThree();
  const resetCam = useLayersManager((state: any) => state.resetCam);
  const setBoolean = useLayersManager((state: any) => state.setBoolean);

  useEffect(() => {
    camera.position.set(0, 0, 4);
    setBoolean("resetCam", false);
  }, [resetCam]);

  return <></>;
}

export function Layers(props: LayersProps) {
  const { size } = props;
  const state = useLayersManager((state: any) => state);

  return (
    <div
      {...props}
      style={{
        bottom: size.top,
        left: size.left,
        width: size.width,
        height: size.height,
      }}
    >
      <section id="layers-layout">
        <section id="three-canvas">
          <Canvas
            shadows
            raycaster={{ params: { Line: { threshold: 0.03 } } }}
            gl={{ preserveDrawingBuffer: true }}
            camera={{
              position: new THREE.Vector3(0, 0, 4),
              aspect: size.width / size.height,
            }}
          >
            <group name="group-layers">
              {state.layers.map((props: LayerProps) => {
                return <Layer {...props} key={`layer-${props.id}`} />;
              })}
            </group>

            {state.orbitControls ? <OrbitControls makeDefault /> : null}
            <TakeScreenshot />
            <DownloadAsJSON />
            <ResetCamera />
          </Canvas>
        </section>
      </section>
    </div>
  );
}

/**
 * For debugging:
 * 
 * 
function selectLayers(ar: any, length: number) {
  console.log(length)
  var res = [] as any; const selected = [
    0., 0., 0.,
    1., 1., 0.,
    1., 1., 1.,
  ];
  var j = 0;

  while (j < length) {
    if (selected[j]) {
      res.push(ar[j]);
    }
    j++;
  }
  console.log(res)
  return res;
}


export function Layers(props: LayersProps) {
  const { size } = props;
  const state = useLayersManager((state: any) => state);

  useEffect(() => {
    
    const promise = import('../colaboraciones/demo.json')
    promise.then(value => {
      const l = 6; 
    // window.alert(value.layersData.length)
    const v = selectLayers(value.layersData, l)
    state.setLayers(v);
      
    })
  } , []);
 * 
 */
