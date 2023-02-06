import { create } from "zustand";
import { RGBAColor } from "../types/common";

export type MaskState = {
  shaderInfo: {
    color: RGBAColor;
    deltaColor: number;
    deltaSmooth: number;
  };
  setColor: Function;
  setDeltaColor: Function;
  setDeltaSmooth: Function;
};

const useMaskManager = create<MaskState>((set: any) => ({
  shaderInfo: {
    color: { r: 154, g: 221, b: 120, a: 0.5 },
    deltaColor: 0.3,
    deltaSmooth: 0.2,
  },
  setColor: (newcolor: RGBAColor) =>
    set((state: MaskState) => {
      return {
        ...state,
        shaderInfo: {
          ...state.shaderInfo,
          color: newcolor,
        },
      };
    }),
  setDeltaColor: (dc: number) =>
    set((state: MaskState) => {
      return {
        ...state,
        shaderInfo: {
          ...state.shaderInfo,
          deltaColor: dc,
        },
      };
    }),
  setDeltaSmooth: (ds: number) =>
    set((state: MaskState) => {
      return {
        ...state,
        shaderInfo: {
          ...state.shaderInfo,
          deltaSmooth: ds,
        },
      };
    }),
}));

export default useMaskManager;
