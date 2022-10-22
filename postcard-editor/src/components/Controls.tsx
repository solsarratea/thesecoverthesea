import React, { useState, useEffect,useRef } from 'react';

import { RgbaColorPicker } from "react-colorful";
import Slider from './Slider';

import useSourceManager from '../hooks/useSourceManager';
import useMaskManager from '../hooks/useMaskManager';
import useLayersManager, { Layer } from '../hooks/useLayersManager';

import { RGBAColor } from '../types/common';

import '../styles/controls.css';


export type ControlsProps = {
  size: {
    left: number,
    top: number,
    width: number,
    height: number
    },
    className: string
}

export function Controls(props: ControlsProps) {
    const { size } = props;
    const [light, turnOn] = useState(true);

    const [mode, setMode] = useState({
        welcome: true,
        instructions: false,
        editMask: false,
        editLayer: false,
        data: false
    })
   
    

    const toggleMode = (selected: string, newVal: boolean) => {
        setMode({ 
            welcome: false,
            instructions: false,
            editMask: false,
            editLayer: false,
            data: false,
            [selected]: newVal
        });

    };
    const { editMask, editLayer, instructions, welcome, data } = mode;

    
    const shaderInfo = useMaskManager((state: any) => state.shaderInfo);
    const setColor = useMaskManager((state: any) => state.setColor);
    const setDeltaColor = useMaskManager((state: any) => state.setDeltaColor);
    const setDeltaSmooth = useMaskManager((state: any) => state.setDeltaSmooth);

    const addLayer = useLayersManager((state: any) => state.addLayer);
    const removeLayer = useLayersManager((state: any) => state.removeLayer);

    const id = useLayersManager((state: any) => state.selectedId);
    const setNewColor = useLayersManager((state: any) => state.setNewColor);
    const setPivotControls = useLayersManager((state: any) => state.setPivotControls);
    const setMix = useLayersManager((state: any) => state.setMix);
    const state = useLayersManager((state: any) => state);
    const selectRef = useRef()  as React.MutableRefObject<HTMLSelectElement>;

    useEffect(() => {
        const select = selectRef.current;
        if (select) {
            const selectEl = select as HTMLSelectElement;

            const options = Array.from(selectEl.options);
            const optionToSelect = options.find(item => item.outerText == id);
            if (optionToSelect) {
                optionToSelect.selected = true;
                }
            }
        }
        ,[selectRef, id])
    
    useEffect(() => {
        const select = selectRef.current;
       
        if (select) {
            const selectEl = select as HTMLSelectElement;
            selectEl.addEventListener("change", () => {
                state.setId(Number(selectEl.value))
            });
        }
    },[selectRef.current])

    const currentElement = useLayersManager((state: any) => {
        var returnValue = null;
        if (id !== null) {
            var index = state.layers.findIndex((object: Layer) => {
                return object.id === id;
            });
            if (index !== -1) {
                returnValue = state.layers[index];
            }
        }
       
        return returnValue;
        
    });
    const path = useSourceManager((state: any) => state.selected.path);
    


    return (<div {...props} id="controls"
            style={{
            bottom: size.top,
            left: size.left,
            width: size.width,
            height: size.height,
            }}>
        <section className="header" >
                <h2>∩｀-´)⊃━☆ﾟ.*･｡ﾟ</h2>
                <button className="emoji" onClick={() => {
                    var r = document.querySelector<HTMLElement>(':root');
                    var newVal = !light;
                    state.setBoolean('light', newVal);
                    if (r) {
                        if (newVal) {
                            r.style.setProperty('--background', '#f8f8f1');
                            r.style.setProperty('--font-color', 'black');
                        } else {
                            r.style.setProperty('--background', 'black');
                            r.style.setProperty('--font-color', '#f8f8f1');
                        }
                    }
                    turnOn(newVal)

                }}>💡</button>
        </section>
        <hr />
       
            <section className="selector">
                <button className={!welcome ? "" : "selected"} onClick={() => {
                    const val = !welcome;
                    toggleMode("welcome", val);
                    state.setBoolean('show', true);
                }}>welcome</button>
                <hr />
                <button className={!instructions ? "" : "selected"} onClick={() => {
                    const val = !instructions;
                    toggleMode("instrusctions", val);
                 
                    state.setBoolean('show', false);

                }}>{`?`}</button>
                <hr/>
                <button className={!editMask ? "" : "selected"} onClick={() => {
                    const val = !editMask;
                    toggleMode("editMask", val);
                    state.setBoolean('show', true);
                }}>mask</button>
                <hr/>
                <button className={!editLayer ? "" : "selected"} onClick={() => {
                    const val = !editLayer;
                    toggleMode("editLayer", val);
                    state.setBoolean('show', true);
                }}>layer</button>
                <hr/>
                <button className={!data ? "" : "selected"} onClick={() => {
                        const val = !data;
                        toggleMode("data", val);
                        state.setBoolean('show', true);
                    }}>data</button>
                
        </section>
        <section className="body" style={{ height: size.height*0.9}}>
            {welcome ?
                <>
                <section className="text scroll">
                    <p>This is a 3D chromatic layer editor from the sketches of Georg Forsters.</p>

                    <p>
                        It is part of the project <a href="https://www.hackdash.org/projects/634ab7a16d202d739f69ce81">THESECOVER THE SEA</a> developed during the hackathon <a href="https://creating-new-dimensions.org/">Creating New Dimensions</a>
                        </p>
                    </section>
                    <section className="text scroll">
            
                    <p>
                       Design a postcard from  the images of dataset <a href="https://creating-new-dimensions.org/Georg-Forsters-Entdeckung-der-Suedsee/">Georg-Forsters-Entdeckung-der-Suedsee</a>, by composing chromatic layers.
                    </p>
                    <img src="./icono.png"></img>
                    <p className="wip">POST your postcard to </p>
                    <p>
                        GO to  <a href="https://thesecoverthesea.solsarratea.world/"> ↓  the sea</a>
                    </p>
                    <p className="wip">
                        AND print it !
                    </p>
                       
    
                </section></>: null}
    
            
            {editMask ?
                <section id="mask" className="scroll">
                    <section className="rgb-layout">
                        <p>↓ selection: </p>
                        <RgbaColorPicker color={shaderInfo.color} onChange={(value: RGBAColor) => setColor(value)} />
                    </section>
                    <section className="slider">
                        <p>↓ threshold: </p>
                        <Slider value={`${shaderInfo.deltaColor * 100}`} callback={(value: number) => setDeltaColor(value)} />
                    </section>
                    <section className="slider">
                        <p>↓ smootheness: </p>
                        <Slider value={`${shaderInfo.deltaSmooth * 100}`} callback={(value: number) => setDeltaSmooth(value)} />
                    </section>
                   
                </section> : null}
    
            {editLayer ?
                
                <section id="layerc" className="scroll">
                    <section className="current" >
                        <p>{`selected layer:`}</p>
                        <select ref={selectRef} name="layer-id" id="select-layer-id">
                            {state.layers.map((o: {id:number}) => 
                                (<option key={`${o.id}-option` }  value={`${o.id}`}>{`${o.id}`}</option>)
                            )}

                        </select>
                    </section>
            
                        <hr/>
                    <section className="rgb-layout">
                        <p>↓ color for output </p>
                        <RgbaColorPicker color={shaderInfo.color} onChange={(value: RGBAColor) => { if (id !== null) { setNewColor(id, value) } }} />
                    </section>
                    <section className="slider">
                            <p>↓ mix color with original source: </p>
                        <Slider value={currentElement ? `${currentElement.mix * 100}` : '80'} callback={(value: number) => setMix(value)} />
                    </section>
                    <hr/>
                    <section className="generator">
                        <p>↓ layer from mask </p>
                        <button className="button" onClick={() => {
                            addLayer({ ...shaderInfo, path });
                        }
                        }>+</button>
                        <button className={`button ${currentElement!== null && currentElement.pivotControls ? "selected" : ""}`} onClick={() => { if (id !== null) { setPivotControls(id) } }}>
                            <img className={`icon ${light ? "" : "inverted"}`}  src="icons/axis.jpeg"/>
                        </button>
                        <button className="button" onClick={() => { if (id !== null) { removeLayer(id) } }}>-</button>
                    </section>
                    <hr/>
                    <section className="world-view">
                        <p>↓ world view camera</p>

                        <button className={`button ${state.orbitControls ? "" : "selected"}`} onClick={() => state.setBoolean('orbitControls', !state.orbitControls )}>2D</button>
                        <button className={`button ${!state.orbitControls ? "" : "selected"}`} onClick={() => state.setBoolean('orbitControls', !state.orbitControls )}>3D</button>
                        <button className="button" onClick={()=> state.setBoolean('resetCam', true)}>R</button>
                    
                    </section>
                    <hr/>
                    <section >
                        <p className="padding-left">↓ <b>show</b> | <b>hide</b> all controls on layers</p>
                        <button className="button ascii"  onClick={() => state.allPivotControls(true)}>{"(･ω･)"}</button>
                        <button className="button ascii" onClick={() => state.allPivotControls(false)}>{"┴┤ω･)"}</button>
                    </section> 
                
                </section> : null}
            {data ?
                <>
                    <div>
                        <p className="padding-left"> ↓ download & post it </p>
                    </div>
                    <hr />
                   
                    <div className="selector">
                        <button className="" onClick={() => state.setBoolean("downloadJSON", true)}>json</button>
                        <hr/>
                        <button className="" onClick={()=> state.setBoolean("takeScreenshot", true)}>image</button>
                        <hr />
                        <button className="">all</button>
                        <hr />
                        <button  className="">ツ</button>
                    </div>
                     
                </>
            :null}
            
        </section>
       
    </div>
    )
}

