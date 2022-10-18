
import React, { useEffect, useState } from 'react';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DataTexture } from 'three';
import * as THREE from 'three';

function Glass() {
    const [hdrEquirect, setHDR] = useState<DataTexture | null>(null);
    const sphere = new THREE.Mesh();
    const geom = new THREE.SphereGeometry();
    sphere.geometry = geom;
  
    useEffect(() => {
      const hdrEquirect = new RGBELoader().load( "HDRI/empty_warehouse_01_2k.hdr" ,() => { 
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
      });
      setHDR(hdrEquirect);
    }, [])
    
    useEffect(() => {
      if (hdrEquirect) {
  
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 1,
        opacity: 1,
        metalness: 0,
        roughness: 0,
        ior: 1.5,
        specularIntensity: 1,
        envMapIntensity: 1,
        side: THREE.DoubleSide,
        transparent: true
      });
        
        sphere.material = material;
      }
    },[hdrEquirect, sphere])
    
  
  
     
    return (
        <>
          <primitive object={sphere} scale={1.} />
        </>
        );
    
}
export default  Glass;