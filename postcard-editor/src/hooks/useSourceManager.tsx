import { create } from "zustand";

export type MediaState = {
  loaded: boolean;
  selected: {
    path: string;
    idx: number;
  };
  setLoaded: Function;
  setSelectedPath: Function;
};

const useSourceManager = create<MediaState>((set: any) => ({
  selected: {
    path: "",
    idx: 1,
  },
  loaded: false,
  setLoaded: () =>
    set((state: MediaState) => {
      console.log(state);
      if (state.loaded) {
        return state;
      } else {
        console.log(state);
        return { ...state, loaded: true };
      }
    }),
  setSelectedPath: (path: string, idx: number) =>
    set((state: MediaState) => {
      // console.log(state);
      return {
        selected: { path: path, idx: idx },
      };
    }),
}));

export default useSourceManager;
