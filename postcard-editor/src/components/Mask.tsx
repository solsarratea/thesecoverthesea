import React, { Suspense, useState } from "react";
import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import Carousel from "./Carousel";
import { RGBAColor } from "../types/common";
import customMaterial from "./maskMaterial";
import * as THREE from "three";
import useSourceManager from "../hooks/useSourceManager";
import useMaskManager from "../hooks/useMaskManager";
import "../styles/mask.css";

export type shaderMaterialProps = {
  path: string;
  color: RGBAColor;
  deltaColor: number;
  deltaSmooth: number;
};
function ShaderMask(props: shaderMaterialProps) {
  const { path, color, deltaColor, deltaSmooth } = props;

  var texture = useTexture(path);

  return (
    <mesh>
      <planeGeometry
        attach="geometry"
        args={[
          (5 * texture.source.data.naturalWidth) /
            texture.source.data.naturalHeight,
          5,
        ]}
      />
      <shaderMaterial
        attach="material"
        args={[customMaterial(texture, color, deltaColor, deltaSmooth)]}
        side={THREE.DoubleSide}
        needsUpdate={true}
      />
    </mesh>
  );
}

export type MaskProps = {
  size: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  className: string;
};

const allSources = require
  .context("../../public/images", false, /\.(png|jpg)$/)
  .keys()
  .map((item: string) => item.replace("./", "images/"));

export function Mask(props: MaskProps) {
  const { size } = props;

  const path = useSourceManager((state: any) => state.selected.path);
  const shaderInfo = useMaskManager((state: any) => state.shaderInfo);
  const onLoaded = useSourceManager((state: any) => state.setLoaded);
  const onSelected = useSourceManager((state: any) => state.setSelectedPath);

  return (
    <div
      {...props}
      style={{
        bottom: size.top,
        left: size.left,
        width: size.width,
        height: size.height,
        padding: "0 0em",
      }}
    >
      <div id="mask-layout">
        <section id="gallery">
          <Carousel
            height={size.height * 0.25}
            width={size.width}
            paths={allSources}
            onLoaded={onLoaded}
            onSelected={onSelected}
          />
        </section>

        <section id="three-canvas">
          <Canvas camera={{ aspect: size.width / size.height }}>
            <Suspense>
              {path ? <ShaderMask {...shaderInfo} path={path} /> : null}
            </Suspense>
            <OrbitControls />
          </Canvas>
        </section>
      </div>
    </div>
  );
}
