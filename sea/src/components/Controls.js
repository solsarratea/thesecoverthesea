import CameraControls from 'camera-controls'
import { useThree } from '@react-three/fiber'
import { useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { KeyboardKeyHold } from 'hold-event'
import useCameraManager from '../hooks/useCameraMnager'

CameraControls.install({ THREE })

const KEYCODE = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
}

export default function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => {
    const controls = new CameraControls(camera, gl.domElement)
    controls.maxZoom = 20
    controls.minZoom = 0.2
    controls.maxPolarAngle = Math.PI / 2
    controls._boundary.min.y = 0
    controls.maxDistance = 1500
    return controls
    //eslint-disable-next-line
  }, [])
  window.c = controls

  controls.mouseButtons.wheel = CameraControls.ACTION.ZOOM

  const [leftKey] = useState(new KeyboardKeyHold(KEYCODE.ARROW_LEFT, 100))
  const [rightKey] = useState(new KeyboardKeyHold(KEYCODE.ARROW_RIGHT, 100))
  const [upKey] = useState(new KeyboardKeyHold(KEYCODE.ARROW_UP, 100))
  const [downKey] = useState(new KeyboardKeyHold(KEYCODE.ARROW_DOWN, 100))

  const active = useCameraManager((state) => state.active)
  const set = useCameraManager((state) => state.set)
  const [lastpos, setLast] = useState(null)

  const disableIfNecesarry = () => {
    if (active) {
      set('active', false)
    }
  }

  useEffect(() => {
    leftKey.addEventListener('holding', function (event) {
      disableIfNecesarry()
      controls.truck(-0.05 * event.deltaTime, 0, true)
    })
    rightKey.addEventListener('holding', function (event) {
      disableIfNecesarry()
      controls.truck(0.05 * event.deltaTime, 0, true)
    })
    upKey.addEventListener('holding', function (event) {
      disableIfNecesarry()
      controls.forward(0.05 * event.deltaTime, true)
    })
    downKey.addEventListener('holding', function (event) {
      disableIfNecesarry()
      controls.forward(-0.05 * event.deltaTime, true)
    })

    return () => {
      leftKey.removeEventListener('holding', function (event) {
        disableIfNecesarry()
        controls.truck(-0.002 * event.deltaTime, 0, true)
      })
      rightKey.removeEventListener('holding', function (event) {
        disableIfNecesarry()
        controls.truck(0.002 * event.deltaTime, 0, true)
      })
      upKey.removeEventListener('holding', function (event) {
        disableIfNecesarry()
        controls.forward(0.005 * event.deltaTime, true)
      })
      downKey.removeEventListener('holding', function (event) {
        disableIfNecesarry()
        controls.forward(-0.005 * event.deltaTime, true)
      })
    }
    //eslint-disable-next-line
  }, [])

  return useFrame((state, delta) => {
    if (active) {
      zoom ? pos.set(focus.x, focus.y, focus.z + 35) : pos.set(0, 0, 0)
      zoom ? look.set(focus.x, focus.y, focus.z - 35) : look.set(0, 0, -10)

      state.camera.position.lerp(pos, 0.35)
      state.camera.updateProjectionMatrix()

      controls.normalizeRotations()

      controls.setLookAt(
        state.camera.position.x,
        Math.min(state.camera.position.y, 1),
        state.camera.position.z,
        look.x,
        look.y,
        look.z,
        true,
      )
      if (
        lastpos &&
        Math.abs(lastpos.distanceTo(controls.getPosition())) < 0.001
      ) {
        set('active', false)
      } else {
        setLast(controls.getPosition())
      }
    }

    return controls.update(delta)
  })
}
