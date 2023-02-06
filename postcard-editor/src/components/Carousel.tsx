import React, { useEffect, useRef, useState } from "react";
import "../styles/carousel.css";
import { Vector3 } from "three";
import { OrbitControls, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
type Props = {
  paths: string[];
  height: number;
  onLoaded: Function;
  onSelected: Function;
  width: number;
};

export default function Carousel(props: Props) {
  const { paths, height, onLoaded, onSelected, width } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [idx, setIdx] = useState(3);
  const [length] = useState(paths.length);

  useEffect(() => {
    if (ref.current) {
      onLoaded();
    }
  }, [ref]);

  useEffect(() => {
    var s = onSelected(paths[idx], idx);
  }, [idx]);

  return (
    <Canvas camera={{ position: new Vector3(0, 0, 8), aspect: width / height }}>
      <Html scale={2} transform occlude position-y={-0.5}>
        <div ref={ref} id="container">
          <button
            className="button"
            onClick={() => {
              const prev = idx === 0 ? length - 1 : idx - 1;
              setIdx(prev);
            }}
          >
            {"<"}
          </button>
          {paths.map((path: string, i: number) => {
            return (
              <img
                key={`${i}-img`}
                height={height * 0.9}
                width={height * 0.9}
                style={i === idx ? {} : { display: "none" }}
                src={path}
                id={`${i}`}
              />
            );
          })}
          <button className="button" onClick={() => setIdx((idx + 1) % length)}>
            {">"}
          </button>
        </div>
      </Html>
      <OrbitControls enableRotate={false} />
    </Canvas>
  );
}
