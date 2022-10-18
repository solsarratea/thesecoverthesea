import React,{  useEffect  ,Suspense,useState,useRef } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { AudioLoader, AudioListener  } from "three";
import useAudioManager  from '../hooks/useAudioManager';

function PositionalSoundCore({id, data,cube,  ...props}){
    const ref = useRef()
    const [listener] = useState(() => new AudioListener())
    const { camera } = useThree()

  const setLoaded = useAudioManager((state) => state.setLoaded);
  const state = useAudioManager((state) => state);
  const buffer =  useLoader(AudioLoader, data[id].path, null, (xhr) => {
    if (xhr.loaded === xhr.total) {
           const de = document.getElementById('debug-0');
           de.innerHTML += "Buffer ready: "+ id+"<br>";
            setLoaded(id, true);
          console.log(state)
        }
    });

    useEffect(() => {
        window.c = camera;
        camera.add(listener);
        return () => camera.remove(listener);

    },[listener,camera]);

    const loaded = useAudioManager((state) => state.didLoad[id]);
    const setAudioRef = useAudioManager((state) => state.setAudioRef);

    useEffect(() => {
        const sound = ref.current;
  
        if (sound && loaded ) {
            sound.setBuffer(buffer);
            sound.setRefDistance(data[id].refdistance);
            const {outer, inner, gain}= data[id].cone;
            sound.setDirectionalCone( outer, inner, gain);
            sound.setMaxDistance(data[id].maxdistance);
            sound.setDistanceModel(data[id].distancemodel);

            sound.setLoop(true);
            sound.volume = data[id].volume;
            sound.name = id;
            setAudioRef(id,sound);
       
        }

        

        return () => {
            //Should close the audio chanel
        }
        // eslint-disable-next-line
    },[id,buffer,loaded,data]);

    return (<Suspense fallback={null}>
            <positionalAudio ref={ref} args={[listener]} position={data[id].position}/>
            </Suspense>);
};
function PositionalSound(props){
    return(  <Suspense fallback={null}>
             <PositionalSoundCore {...props}/>
             </Suspense>
);}

export default PositionalSound;