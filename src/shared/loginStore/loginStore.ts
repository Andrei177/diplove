import { create } from "zustand";

interface ILoginStore{
    login: string,
    password: string,
    setLogin: (newLogin: string) => void,
    setPassword: (newPassword: string) => void,
    isLoading: boolean,
    setIsLoading: (bool: boolean) => void,
}

export const useLoginStore = create<ILoginStore>(set => ({
    login: "",
    password: "",
    setLogin: (newLogin: string) => set({login: newLogin}),
    setPassword: (newPassword: string) => set({password: newPassword}),
    isLoading: false,
    setIsLoading: (bool: boolean) => set({isLoading: bool}),
}))