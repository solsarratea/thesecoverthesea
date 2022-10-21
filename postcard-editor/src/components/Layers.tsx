import React, { Suspense, useEffect } from 'react';
import customMaterial,{ LayerUniforms }  from './layerMaterial';
import useLayersManager from '../hooks/useLayersManager';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, PivotControls } from '@react-three/drei'
import '../styles/layers.css';
import { RGBAColor } from '../types/common';
import { Mesh, StaticReadUsage } from 'three';

export type LayersProps = {
    size: {
      left: number,
      top: number,
      width: number,
      height: number,
    },
  className: string
}
  
export type LayerProps = {
  colorIn: RGBAColor,
  colorOut: RGBAColor,
  deltaColor: number,
  deltaSmooth: number,
  id: number,
  mix: number,
  path: string,
  pivotControls: boolean

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
    pivotControls
    } = props;
 

    var texture = useTexture(path);
    const setId = useLayersManager((state: any) => state.setId);
    const layers = useLayersManager((state: any) => state.layers);
  return (
        <Suspense>
         <PivotControls visible={pivotControls} rotation={[0, 0., 0]} anchor={[0, 0, 0]} scale={75} depthTest={false} fixed lineWidth={2}>
            <mesh name={`layer-${props.id}`} position={new THREE.Vector3(0., 0., -id * .2)} onClick={() => {
              setId(id)
            }
            }>
                  <planeGeometry  attach="geometry" args={[4*texture.source.data.naturalWidth/texture.source.data.naturalHeight,4]} />
                  <shaderMaterial  transparent={true} 
                    attach="material"
                  args={[customMaterial({ texture, colorIn, colorOut, deltaColor, deltaSmooth, mix })]}
                    side={THREE.DoubleSide}
                />
              </mesh>
          </PivotControls>
      </Suspense>
      
    
    )
}

function downloadURI(uri:string, name:string, id: string) {
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
  const downloadJSON = useLayersManager((state:any) =>state.downloadJSON)
  const setBoolean = useLayersManager((state: any) => state.setBoolean);
  const state = useLayersManager((state: any) => state);
  
  const exportScene = () => {

      const layersData = state.layers.map((layer: LayerProps) => {
      const { id } = layer;
      const mesh = scene.getObjectByName(`layer-${id}`) as Mesh;
      
        
      return {
        ...layer,
        position: mesh.position,
        rotation: mesh.rotation
      }
      })
    
    return {
      layersData,
      lightMode: state.light
    };
  };
  
  useEffect(() => {
    if (downloadJSON) {
      const data = exportScene();
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data,null,4));
      downloadURI(dataStr, "postcard-data.json","download-json");
       setBoolean("downloadJSON", false);
    }

  }, [downloadJSON]);
  return <></>;
}
  

function TakeScreenshot() {
  const { gl, scene, camera } = useThree()
  const takeScreenshot = useLayersManager((state:any) =>state.takeScreenshot)
  const setBoolean = useLayersManager((state: any) => state.setBoolean);
  
  useEffect(() => {
    if (takeScreenshot) {
      gl.render(scene, camera)
      const screenshot = gl.domElement.toDataURL();
      downloadURI(screenshot, "postcard-view.png","download-image");
      setBoolean("takeScreenshot", false);
    }

  }, [takeScreenshot]);

  return <></>;
}

function ResetCamera() {
  const { camera } = useThree();
  const resetCam = useLayersManager((state:any) =>state.resetCam)
  const setBoolean = useLayersManager((state: any) => state.setBoolean);
  
  useEffect(() => {
    camera.position.set( 0, 0, 4);
    setBoolean("resetCam", false); 

  }, [resetCam]);

  return <></>;
}




export function Layers(props: LayersProps) {
  const { size } = props;
  const state = useLayersManager((state: any) => state);

    return (<div {...props}
      style={{
        bottom: size.top,
        left: size.left,
        width: size.width,
        height: size.height,
      }}
    >
      <section id="layers-layout">
        <section id="three-canvas">
          <Canvas shadows
            raycaster={{ params: { Line: { threshold: 0.03 } } }}
            gl={{ preserveDrawingBuffer: true }} 
            camera={{
              position: new THREE.Vector3(0, 0, 4),
              aspect: size.width/size.height
            }}>
            <group name="group-layers">
              {state.layers.map((props: LayerProps) => {
                  return (
                    <Layer  {...props} key={`layer-${props.id}`} />
                  )
                })}
            </group>
              
                {state.orbitControls ? <OrbitControls makeDefault/> : null}
                <TakeScreenshot />
                <DownloadAsJSON/>
                <ResetCamera />
              </Canvas>
          
          </section> 
      </section>
        
      
     
        
      </div>
      )
}

