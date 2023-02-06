import { create } from "zustand";
import { RGBAColor } from "../types/common";
import { Matrix4 } from "three";
export type Layer = {
  colorIn: RGBAColor;
  colorOut: RGBAColor;
  deltaColor: number;
  deltaSmooth: number;
  id: number;
  mix: number;
  path: string;
  pivotControls: boolean;
  pivotId: number;
};

export type LayersState = {
  layers: Layer[];
  nextId: number;
  selectedId: number;
  addLayer: Function;
  removeLayer: Function;
  setPivotControls: Function;
  setColor: Function;
  setMix: Function;
  setBoolean: Function;
  resetCam: boolean;
  downloadJSON: boolean;
  takeScreenshot: boolean;
  light: boolean;
};

type LayerManager = {
  light: boolean;
  resetCam: boolean;
  takeScreenshot: boolean;
  downloadJSON: boolean;
  layers: Layer[];
  nextId: number;
  selectedId?: number | null;
  orbitControls: boolean;
  setId: Function;
  addLayer: Function;
  removeLayer: Function;
  setNewColor: Function;
  setPivotControls: Function;
  setMix: Function;
  setBoolean: Function;
  allPivotControls: Function;
};

const useLayersManager = create<LayerManager>((set) => ({
  light: true,
  resetCam: false,
  takeScreenshot: false,
  downloadJSON: false,
  layers: [],
  nextId: 0,
  selectedId: null,
  show: true,
  orbitControls: false,
  setId: (id: number) =>
    set((state: LayerManager) => {
      return {
        ...state,
        selectedId: id,
      };
    }),
  addLayer: (newLayer: any) =>
    set((state: LayerManager) => {
      const { color, ...rest } = newLayer;
      state.layers.push({
        ...rest,
        colorIn: color,
        colorOut: color,
        id: state.nextId,
        pivotControls: true,
      });

      return {
        ...state,
        nextId: state.nextId + 1,
        selectedId: state.nextId,
      };
    }),
  setPivotId: (id: number, pivotId: number) =>
    set((state: LayerManager) => {
      var index = state.layers.findIndex((object) => {
        return object.id === id;
      });
      state.layers[index].pivotId = pivotId;

      return {
        ...state,
      };
    }),
  removeLayer: (id: number) =>
    set((state: LayerManager) => {
      var index = state.layers.findIndex((object) => {
        return object.id === id;
      });
      state.layers.splice(index, 1);
      const newId =
        state.layers.length > 0
          ? state.layers[state.layers.length - 1].id
          : null;

      return {
        ...state,
        selectedId: newId,
      };
    }),
  setNewColor: (id: number, newcolor: RGBAColor) =>
    set((state: LayerManager) => {
      var index = state.layers.findIndex((object) => {
        return object.id === id;
      });
      state.layers[index].colorOut = newcolor;
      return {
        ...state,
      };
    }),
  setPivotControls: (id: number) =>
    set((state: LayerManager) => {
      var index = state.layers.findIndex((object) => {
        return object.id === id;
      });
      var currentValue = state.layers[index].pivotControls;
      state.layers[index].pivotControls = !currentValue;
      return {
        ...state,
      };
    }),
  setMix: (value: number) =>
    set((state: LayerManager) => {
      var id = state.selectedId;
      if (id === null) return state;
      var index = state.layers.findIndex((object) => {
        return object.id === id;
      });
      state.layers[index].mix = value;
      return {
        ...state,
      };
    }),
  setBoolean: (key: string, value: boolean) =>
    set((state: LayerManager) => {
      return {
        ...state,
        [key]: value,
      };
    }),
  allPivotControls: (val: boolean) =>
    set((state: LayerManager) => {
      const layers = state.layers.map((object) => {
        return {
          ...object,
          pivotControls: val,
        };
      });
      return {
        ...state,
        layers: layers,
      };
    }),
}));

export default useLayersManager;
