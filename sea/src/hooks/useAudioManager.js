import create from 'zustand';

const useAudioManager = create((set) => ({
   didLoad: {
        audio1: false

    },
    audiosRef: {
        audio1: null       
    },
    setLoaded: (type, loaded) =>
        set((state) => {
            return {
                didLoad: { ...state.didLoad, [type]: loaded },
            };
        }),
    setAudioRef: (type, ref) =>
        set((state) => {
            return {
                audiosRef: { ...state.audiosRef, [type]: ref },
            };
        })
}));


export default useAudioManager;