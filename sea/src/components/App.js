import Postcards from './Postcards.js'
import Ocean from './Ocean.js'
import CustomEffects from './CustomEffects'
import Controls from './Controls'
import { useFrame } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { hot } from 'react-hot-loader/root'
import PositionalSound from './Audio.js'
import useEnvManager from './useEnvManager.js'
import { Vector3 } from 'three'
import useCameraManager from '../hooks/useCameraMnager.js'
const DisableRender = () => useFrame(() => null, 1000)

const audioData = {
  audio1: {
    position: [0, 0, 0],
    path: '/audio/ocean-Emi-Vega.wav',
    refdistance: 50,
    cone: {
      outer: 360,
      inner: 360,
      gain: 0.1,
    },
    rotation: [0, Math.PI / 2, 0],
    maxdistance: 500,
    distancemodel: 'exponential',
    volume: 1,
  },
}

function App({ loaded }) {
  const [modalOn] = useState({
    value: false,
  })
  const envPath = useEnvManager((state) => state.envPath)
  const set = useCameraManager((state) => state.set)
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})

  const updateControls = (focusRef, newZoom) => {
    setZoom(newZoom)
    setFocus(focusRef)
    set('active', true)
  }

  return (
    <Suspense fallback={null}>
      <Canvas
        dpr={[2, 1]}
        shadows
        camera={{ far: 3000, position: new Vector3(0, 0, 0) }}
      >
        {modalOn.value ? <DisableRender /> : null}
        <Postcards updateControls={updateControls} />
        <Ocean />
        <PositionalSound id={'audio1'} data={audioData} />
        <Controls zoom={zoom} focus={focus} />
        <Environment
          scale={1}
          background={true}
          path={envPath}
          files={[`px.png`, `nx.png`, `py.png`, `ny.png`, `pz.png`, `nz.png`]}
        />

        <CustomEffects />
      </Canvas>
    </Suspense>
  )
}

export default hot(App)
