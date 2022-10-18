import { on } from 'stream';
import create from 'zustand';
import { RGBAColor } from '../types/common';

export type Layer = {
    colorIn: RGBAColor,
    colorOut: RGBAColor,
    deltaColor: number,
    deltaSmooth: number,
    id: number,
    mix: number,
    path: string,
    pivotControls: boolean
}
 
 export type LayersState = { 
    layers: Layer[],
    nextId: number,
    selectedId: number,
    addLayer: Function,
    removeLayer: Function,
    setPivotControls: Function,
    setColor: Function,
    setMix: Function,
    setBoolean: Function,
    resetCam: boolean,
    downloadJSON: boolean,
    takeScreenshot: boolean,
    light: boolean
 }

const useLayersManager = create((set) => ({
    light: true,
    resetCam: false,
    takeScreenshot: false,
    downloadJSON:false,
    layers: [],
    nextId: 0,
    selectedId: null,
    show: true,
    orbitControls: false,
    setId: (id: number) => 
        set((state: LayersState) => {
            return {
                ...state,
                selectedId: id
            }
        }), 
    addLayer: (newLayer: any) =>
        set((state: LayersState) => {
            const { color, ...rest } = newLayer;
            state.layers.push({
                ...rest,
                colorIn: color,
                colorOut: color,
                id: state.nextId,
                pivotControls: true
            });

            return {...state,
                nextId: state.nextId + 1,
                selectedId: state.nextId
            }
        }),
    removeLayer: (id: number) =>
        set((state: LayersState) => {
            var index = state.layers.findIndex(object => {
                return object.id === id;
            });
            state.layers.splice(index,1);
            return {
                ...state,
                selectedId: null
            };
        }),
    setNewColor: (id: number, newcolor: RGBAColor) =>
        set((state: LayersState) => {
            var index = state.layers.findIndex(object => {
                return object.id === id;
            });
            state.layers[index].colorOut = newcolor;
            return {
                ...state
            };
        }),
    setPivotControls: (id: number) =>
        set((state: LayersState) => {
            var index = state.layers.findIndex(object => {
                return object.id === id;
            });
            var currentValue = state.layers[index].pivotControls;
            state.layers[index].pivotControls = !currentValue;
            return {
                ...state
            };
        }),
    setMix: ( value: number) =>
        set((state: LayersState) => {
            var id = state.selectedId;
            if (id === null) return state;
            var index = state.layers.findIndex(object => {
                return object.id === id;
            });
            state.layers[index].mix = value;
            return {
                ...state
            };
        }),
    setBoolean: (key: string, value: boolean) => 

        set((state: LayersState) => {
            return {
                ...state,
                [key]: value
            }
        }), 
        allPivotControls: (val: boolean) =>
        set((state: LayersState) => {
             const layers= state.layers.map(object => {
                 return {
                    ...object,
                    pivotControls: val,
                 }
             });
            return {
                ...state,
                layers: layers
            };
        }),
    
}));

export default  useLayersManager ;
