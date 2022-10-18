import { useRef, Suspense } from "react";
import * as THREE from "three";
import { useLoader } from '@react-three/fiber'
import { DoubleSide } from "three";

function Layer({  path, args, position }) {

    const mesh = useRef();
    const texture = useLoader(THREE.TextureLoader, path);
    return (
        <Suspense fallback={null}>
            <mesh ref={mesh}  position={position} receiveShadows>
                <planeBufferGeometry  args={args} />
                <meshBasicMaterial attach="material" transparent={true} map={texture} side={DoubleSide}/>

            </mesh>
        </Suspense>
    );
}

export default Layer;