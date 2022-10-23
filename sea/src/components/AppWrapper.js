import React,{useState, useRef ,useEffect} from 'react'
import '../styles/index.css'
import "../styles/onboarding.css";
import {isMobile} from 'react-device-detect';
import UI from './UI.js';
import { useTransition, a } from "react-spring";
import * as THREE from "three";
import useAudioManager from '../hooks/useAudioManager';
import App from './App';

const UPPER_BOUND_TRANSITION = isMobile? 50 : 300;
function OpacityLayer({onSuccess,  offTransition, enter}) {

    useEffect(()=>{
        const handler = ()=>{
            onSuccess();
            document.removeEventListener("touchstart",handler, { passive: true});
            document.removeEventListener("click",handler, { passive: true});
        }

        document.addEventListener("touchstart", handler, { passive: true});
        document.addEventListener("click", handler, { passive: true});

        return () => {
            document.removeEventListener("touchstart",handler, { passive: true});
            document.removeEventListener("click",handler, { passive: true});

        };
    },[onSuccess]);


    const [finished, setFinished] = useState(false);

    const [totalopacity, setTotalopacity] = useState(1);
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        THREE.DefaultLoadingManager.onStart = () => {
        }
        THREE.DefaultLoadingManager.onError = (e) => {
            window.alert(e)
        }
        THREE.DefaultLoadingManager.onLoad = () => {
            setFinished(true);
            console.log(finished)
        }
        THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            const v =(itemsLoaded / itemsTotal) * 100;
            console.log("Loading scene: ", v, "%");
            const value = (100. - v * 0.5);
            document.querySelector(':root').style.setProperty('--invert-bg', `${value}%`);
           
        }
        if (enter) {setTotalopacity(0.75)};
        if ((enter && finished)){
            if(counter<UPPER_BOUND_TRANSITION){ setCounter(counter+1)};
            if(counter>=UPPER_BOUND_TRANSITION){ offTransition();}

        }

    }, [ finished, counter, enter, offTransition, totalopacity]);

    const transitions = useTransition(finished, {
        from: { opacity: 1, counter: 0, width: 0 },
        leave: { opacity: 0 },
        update: { counter }
    });


    return (  <div style={{ display: 'flex' }}>
        {transitions(
            (props) =>
            (<a.div className={"loading"}
                style={{
                    opacity: (1 - counter / UPPER_BOUND_TRANSITION) * totalopacity,
                }
                } />
            ))}
        </div>)
                  
}


function AppWrapper(props) {
    const ref = useRef();
    const { children } = props;
   
    let [ui, setUi] = useState(false);
    let [enter, setEnter] = useState(false);

    useEffect(() => {
        setUi(true)
    }, [ref])

    const [transition, offTransition] = useState(false);

    const didLoadAllAudio = (state) =>{
        return Object.values(state.audiosRef).every(Boolean)
       
    };

    const allAudioLoaded = useAudioManager(didLoadAllAudio);
    const refs = useAudioManager((state) => state.audiosRef);
 
    useEffect(() => {
        if (enter && allAudioLoaded){
            refs["audio1"].play();

        };
    }, [allAudioLoaded, enter,refs])

    const WrappedUI= React.forwardRef((props, ref)=> <UI {...props} forwardRef={ref}/>);
    
    const userInteractionDispatchAudio = () => {
            setEnter(true);
          
    };


    return (<>
                <WrappedUI ref={ref} init={!enter} show={enter ? false : ui && allAudioLoaded } />
                <App loaded={enter} />
                {children}
                {!transition ?
                 <OpacityLayer enter={enter}
                               onSuccess={userInteractionDispatchAudio}
                               offTransition={() => offTransition(true)}/>  : null}

            </>)
}

export default AppWrapper;