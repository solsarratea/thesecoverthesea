import React, { useEffect, useState } from 'react';
import { Controls } from './components/Controls'
import { Mask } from './components/Mask'
import { Layers } from './components/Layers'
import Information from  './components/Information'
import useSourceManager from './hooks/useSourceManager';
import useLayersManager from './hooks/useLayersManager';

function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const didLoad = useSourceManager((state: any) => state.loaded);
  const path = useSourceManager((state: any) => state.selected.path);
  const show = useLayersManager((state: any) => state.show);
  
  
  useEffect(() => {
    //console.log(didLoad)
    //console.log(path)
  }, [didLoad, path])

  useEffect(() => {

    const resize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      
    }
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  
  return (
    < >
      
      <Controls size={{
        left: 0,
        top: 0,
        width: width / 2 * (1 / 3.),
        height: height,
      }} className="block"
      />
      {!show ?
        <Information blockSize1={{
          left: width / 2 * 1. / 3,
          top: 0,
          width: width / 2 * (2 / 3.),
          height: height,
        } }
          blockSize2={{
            left: width / 2,
            top: 0,
            width: width / 2,
            height: height,
          }

          }
        /> :
        <>
          <Mask size={{
            left: width / 2 * 1. / 3,
            top: 0,
            width: width / 2 * (2 / 3.),
            height: height,
          }} className="block" />
        
          <Layers size={{
            left: width / 2,
            top: 0,
            width: width / 2,
            height: height,
          }} className="block" />
        </>}
      </>
  );
}

export default App;