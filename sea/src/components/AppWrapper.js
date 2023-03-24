import React,{useState, useRef ,useEffect} from 'react'
import '../styles/index.css'
import "../styles/onboarding.css";
import UI from './UI.js';
import { useSpring, a } from "react-spring";
import {DefaultLoadingManager} from "three";
import useUIManager from '../hooks/useUIManager';
import App from './App';

export function OpacityLayer() {
  const setResource = useUIManager(state=>state.resourceLoaded);
  const update = useUIManager(state=>state.update)
  const percent = useRef(100);
  const [finished, set] = useState(false)
  useEffect(() => {
    DefaultLoadingManager.onLoad = () => {
      setResource('scene',true);
      set(true)
    };
    DefaultLoadingManager.onProgress = (
      url,
      itemsLoaded,
      itemsTotal
    ) => {
      const v = (itemsLoaded / itemsTotal) * 100;
      percent.current = v;
      console.log(percent.current)
    };
    DefaultLoadingManager.onError = function(url) {
      console.log("There was an error loading " + url);
    };
    //eslint-disable-next-line
  }, []);

  const imgProps = useSpring({
    filter: `grayscale(${percent.current}%)`,
  });

  const innerBarProps = useSpring({
    width: `${percent.current}%`,
  });
  const firstGesture = useUIManager(state=>state.firstGesture)
  const olProps = useSpring({
    from: { opacity: 1 },
    to: { opacity: finished && firstGesture ? 0 : 1 },
    config: { duration: 8000 },
    onResolve: ({ value }) => {
      if (Number(value) === 0) {
        update('transition',false)
      }
    },
  });
  return (
    <>
      <a.div className="opacity-layer" style={olProps}>
        <a.div className="loading" style={{imgProps}} />
        <div className="loading-bar-container">
          <a.div className="loading-bar" style={innerBarProps} />
        </div>
      </a.div>
    </>
  );
}


function AppWrapper(props) {
    const transition = useUIManager((state) => state.transition)

    return (<>
                <UI />
                <App />
                {transition ?
                 <OpacityLayer /> : null}

            </>)
}

export default AppWrapper;