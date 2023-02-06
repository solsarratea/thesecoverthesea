import create from 'zustand'

const useCameraManager = create((set) => ({
  active: true,
  name: '',
  set: (type, value) =>
    set((state) => {
      return {
        ...state,
        [type]: value,
      }
    }),
}))

export default useCameraManager
