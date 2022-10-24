import { useThree } from "@react-three/fiber";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { Vector3 } from "three";
import  PointerLockControls from "./PointerLockControls";
import { useMemo,useState } from "react";

function Viewer(props) {
    const { camera , clock } = useThree();
  
    const [handleEvent, setHandleEvent]= useState(false);
    const [last, setLast]=useState(0);
    const onSuccess = (e)=>{
        setHandleEvent(e);
        const delta = Math.floor(clock.oldTime-last);
        if(delta > 1000){
            setLast(clock.oldTime);
        }

    }
    const { moveForward, moveBackward, moveLeft, moveRight } = useKeyboardControls({onSuccess: onSuccess});
    const INCREMENT = 15;

    useMemo(() => {
        const direction = new Vector3();
        const frontVector = new Vector3(
            0,
            0,
            Number(moveBackward) - Number(moveForward)
        );
        const sideVector = new Vector3(
            Number(moveLeft) - Number(moveRight),
            0,
            0
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()


        camera.getWorldDirection( direction);
        direction.x = Math.round(direction.x);
        direction.y =  Math.round(direction.y); // TODO: ask if we want above/below
        direction.z = Math.round(direction.z);

        camera.position.addScaledVector(direction, -INCREMENT*frontVector.z);
        const rotatedDirection = new Vector3(direction.z, direction.y, -direction.x);
        camera.position.addScaledVector(rotatedDirection, INCREMENT*sideVector.x);
        setHandleEvent(false);
  
        /*
          const de = document.getElementById('debug-0');
          de.innerHTML = "mf "+ moveForward  +" || mb "+ moveBackward;
          de.innerHTML += "|| fv "+ frontVector.z  +" || sv "+ sideVector.x;
          de.innerHTML += "world diection: "+ direction.x +" || " +  direction.y +" || " + direction.z +
          "|| cam direction: "+ camera.position.x +" || " +  camera.position.y +" || " + camera.position.z;*/

    },[ camera, handleEvent, moveForward, moveBackward, moveLeft, moveRight]);

    return (
            <>
            <PointerLockControls />
            </>
    );
}

export default Viewer;