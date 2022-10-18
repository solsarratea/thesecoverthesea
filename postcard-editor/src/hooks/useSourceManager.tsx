import create from 'zustand';

 export type MediaState = { 
    loaded: boolean,
    selected: {
        path: string,
        idx: number,
    },
    setLoaded: Function,
    setSelectedPath: Function
 }

const useSourceManager = create((set) => ({
    selected: {
        path: "",
        idx: 1,
    },
    loaded: false,
    setLoaded: () =>
        set((state: MediaState) => {
            if (state.loaded) {
              //  console.log(state);
                return state
            } else {
    
                return {...state,
                    loaded: true,
                }
            };
        }),
    setSelectedPath: (path: string, idx: number) =>
        set((state: MediaState) => {
           // console.log(state);
            return {
                selected: { path: path, idx: idx}
            };
        })
}));

export default  useSourceManager;
