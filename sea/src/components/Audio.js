import React,{  useEffect  ,Suspense,useState,useRef } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { AudioLoader, AudioListener  } from "three";
import useAudioManager  from '../hooks/useAudioManager';
import useUIManager from "../hooks/useUIManager";

function PositionalSoundCore({ id, start, data, buffer, ...props }) {
    const ref = useRef()
    const [listener] = useState(() => new AudioListener())
    const { camera } = useThree()
  
    useEffect(() => {
      camera.add(listener)
      return () => camera.remove(listener)
    }, [listener, camera])
  
    const loaded = useAudioManager((state) => state.didLoad[id])
    const setAudioRef = useAudioManager((state) => state.setAudioRef)
  
    useEffect(() => {
      const sound = ref.current
      if (sound) {
        setAudioRef(id, sound)
        sound.setBuffer(buffer)
        sound.setRefDistance(data[id].refdistance)
        sound.setRolloffFactor(data[id].rollofffactor)
        const { outer, inner, gain } = data[id].cone
        sound.setDirectionalCone(outer, inner, gain)
        sound.setMaxDistance(data[id].maxdistance)
        sound.setDistanceModel(data[id].distancemodel)
        sound.setLoop(true)
        sound.volume = data[id].volume
        sound.name = id
      }
  
      if (sound && loaded) {
        sound.play()
      }
      return () => {}
      // eslint-disable-next-line
    }, [id, buffer, loaded, data])
  
    return (
      <Suspense fallback={null}>
        <positionalAudio
          ref={ref}
          args={[listener]}
          position={data[id].position}
        />
      </Suspense>
    )
  }
  function PositionalSound({ id, data }) {
    const setLoaded = useAudioManager((state) => state.setLoaded)
  
    const buffer = useLoader(AudioLoader, data[id].path, null, (xhr) => {
      if (xhr.loaded === xhr.total) {
        //const de = document.getElementById('debug-0')
        // de.innerHTML += 'Buffer ready: ' + id + '<br>'
        setLoaded(id, true)
      }
    })
    return (
      <Suspense fallback={null}>
        <PositionalSoundCore id={id} data={data} buffer={buffer} />
      </Suspense>
    )
  }

function Audio() {
    const allLoaded = useAudioManager((state) => state.audiosRef.audio1);
    const setResource = useUIManager((state) => state.resourceLoaded);

    const audioData = {
        audio1: {
          position: [0, 0, 0],
          path: '/audio/ocean.mp3',
          refdistance: 100,
          cone: {
            outer: 360,
            inner: 360,
            gain: 0.1,
          },
          rotation: [0, Math.PI / 2, 0],
          maxdistance: 800,
          distancemodel: 'exponential',
          volume: 10,
          rollofffactor: 3
        },
      }
    useEffect(() => {
      if (allLoaded) {
        setResource('audio', true)
      }
    }, [allLoaded, setResource])
  
    return (
      <>
        <PositionalSound id={'audio1'} data={audioData} />
       
      </>
    )
  }
  
  export default Audio