import create from 'zustand';

const useEnvManager = create((set) => ({
    envPath: "textures/skybox/gloriousPink/",
    setDay: () =>
        set((state) => {
                return {...state,
                    envPath: 'textures/skybox/gloriousPink/',
                }
        }),
    setNight: () =>
        set((state) => {
                return {...state,
                    envPath: 'textures/skybox/night/',
                }
        }),
    
}));

export default  useEnvManager;
