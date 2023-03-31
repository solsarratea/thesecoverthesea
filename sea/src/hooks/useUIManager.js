import create from 'zustand'

const useUIManager = create((set) => ({
  firstGesture: false,
  init: true,
  transition: true,
  invite: false,
  loadingResources: {
    audio: false,
    scene: false,
  },
  update: (key, value) =>
    set((state) => {
      return {
        ...state,
        [key]: value,
      }
    }),
  resourceLoaded: (name, value) =>
    set((state) => {
      const newState = {
        ...state,
        loadingResources: {
          ...state.loadingResources,
          [name]: value,
        },
      }

      return newState
    }),
}))

export default useUIManager
