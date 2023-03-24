import Postcards from './Postcards.js'
import Ocean from './Ocean.js'
import CustomEffects from './CustomEffects'
import Controls from './Controls'
import { useFrame } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { hot } from 'react-hot-loader/root'
import Audio from './Audio.js'
import useEnvManager from '../hooks/useEnvManager.js'
import { Vector3 } from 'three'
import useCameraManager from '../hooks/useCameraMnager.js'
const DisableRender = () => useFrame(() => null, 1000)

function App() {
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
        <Audio/>
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
