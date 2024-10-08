import { create } from "zustand";

interface IStore{
    isAuth: boolean,
    setIsAuth: (bool: boolean) => void,
    hasRefreshed: boolean,
    setHasRefreshed: (bool: boolean) => void,
}

export const useAuthStore = create<IStore>(set => ({
    isAuth: false,
    setIsAuth: (bool: boolean) => set({isAuth: bool}),
    hasRefreshed: false,
    setHasRefreshed: (bool: boolean) => set({hasRefreshed: bool}),
}))