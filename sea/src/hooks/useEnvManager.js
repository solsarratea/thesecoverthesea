import create from 'zustand';

const useEnvManager = create((set) => ({
    envPath: "textures/skybox/gloriousPink/",
    visible:true,
    update: (key, value) =>
        set((state) => {
                return {...state,
                [key]:value,
                }
        }),
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
