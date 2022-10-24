import React, { useEffect, useRef } from "react";
import { extend, useThree } from "@react-three/fiber";
import {isMobile} from 'react-device-detect';
import {
	Euler,
	EventDispatcher,
	Vector3,

} from 'three';

const _euler = new Euler( 0, 0, 0, 'YXZ' );
const _vector = new Vector3();
const _changeEvent = { type: 'change' };
const _lockEvent = { type: 'lock' };
const _unlockEvent = { type: 'unlock' };

const _PI_2 = Math.PI / 2;

class PointerLockControlsExt extends EventDispatcher {

	constructor( camera, domElement ) {

		super();
		if ( domElement === undefined ) {

			console.warn( 'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.' );
			domElement = document.body;

		}

		this.domElement = domElement;
		this.isLocked = false;
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians

		this.pointerSpeed = isMobile? 1: 1;

		const scope = this;

		function onMouseMove( event ) {
			if ( !isMobile && scope.isLocked === false ) return;

            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
/*
            const de = document.getElementById('debug-0');
            de.innerHTML = "isMobile? "+ isMobile +"|| movementX: "+movementX + " || movementY: "+ movementY;
*/
			_euler.setFromQuaternion( camera.quaternion );

			_euler.y -= movementX * 0.002 * scope.pointerSpeed;
			_euler.x -= movementY * 0.002 * scope.pointerSpeed;

			_euler.x = Math.max( _PI_2 - scope.maxPolarAngle, Math.min( _PI_2 - scope.minPolarAngle, _euler.x ) );

			camera.quaternion.setFromEuler( _euler );

			scope.dispatchEvent( _changeEvent );

		}

		function onPointerlockChange() {

			if ( scope.domElement.ownerDocument.pointerLockElement === scope.domElement ) {

				scope.dispatchEvent( _lockEvent );

				scope.isLocked = true;

			} else {

				scope.dispatchEvent( _unlockEvent );

				scope.isLocked = false;

			}

		}

		function onPointerlockError() {

			console.error( 'THREE.PointerLockControls: Unable to use Pointer Lock API' );

		}
        function onTouchMove(e){
            const event = isMobile ? e.touches[0] : e;

            const deltaX= event.clientX - window.sx;
            e.movementX = Math.abs(deltaX)>50 ? 0 : deltaX;
            const deltaY= event.clientY - window.sy;
            e.movementY = Math.abs(deltaY)>50 ? 0 : deltaY;

            onMouseMove(e);
            window.sx = event.clientX;
            window.sy = event.clientY;

        }

	    this.connect = function () {

			scope.domElement.ownerDocument.addEventListener( 'mousemove', onMouseMove );
            scope.domElement.ownerDocument.addEventListener( 'touchmove', onTouchMove );
			scope.domElement.ownerDocument.addEventListener( 'pointerlockchange', onPointerlockChange );
			scope.domElement.ownerDocument.addEventListener( 'pointerlockerror', onPointerlockError );

		};

		this.disconnect = function () {

			scope.domElement.ownerDocument.removeEventListener( 'mousemove', onMouseMove );
			scope.domElement.ownerDocument.removeEventListener( 'pointerlockchange', onPointerlockChange );
			scope.domElement.ownerDocument.removeEventListener( 'pointerlockerror', onPointerlockError );

            scope.domElement.ownerDocument.removeEventListener( 'touchmove', onTouchMove );

		};

		this.dispose = function () {

			this.disconnect();

		};

		this.getObject = function () { // retaining this method for backward compatibility

			return camera;

		};

		this.getDirection = function () {

			const direction = new Vector3( 0, 0, - 1 );

			return function ( v ) {

				return v.copy( direction ).applyQuaternion( camera.quaternion );

			};

		}();

		this.moveForward = function ( distance ) {

			// move forward parallel to the xz-plane
			// assumes camera.up is y-up

			_vector.setFromMatrixColumn( camera.matrix, 0 );

			_vector.crossVectors( camera.up, _vector );

			camera.position.addScaledVector( _vector, distance );

		};

		this.moveRight = function ( distance ) {

			_vector.setFromMatrixColumn( camera.matrix, 0 );

			camera.position.addScaledVector( _vector, distance );

		};

		this.lock = function () {

			this.domElement.requestPointerLock();

		};

		this.unlock = function () {

			scope.domElement.ownerDocument.exitPointerLock();

		};

		this.connect();

	}

}

extend({PointerLockControlsExt});

const PointerLockControls = (props) => {
  const { camera, gl } = useThree();
    const controls = useRef();


  useEffect(() => {
    const canvas = document.getElementsByTagName("Canvas")[0];
    canvas.addEventListener("mouseup", () => {
        controls.current.unlock();
        controls.current.disconnect();

    }, { passive: true});

      canvas.addEventListener("mousedown", (e) => {
          controls.current.connect();
          controls.current.lock();
      }, { passive: true})


      canvas.addEventListener("touchstart", (event) => {
          window.sx = event.touches[0].pageX;
          window.sy = event.touches[0].pageY;

          controls.current.connect();
          controls.current.lock();
      }, { passive: true});

      canvas.addEventListener("touchend", (event) => {
          window.sx = 0;
          window.sy = 0;

        controls.current.unlock();
        controls.current.disconnect();
      }, { passive: true});

  }, []);


  return (
    <pointerLockControlsExt
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};

export default PointerLockControls;
