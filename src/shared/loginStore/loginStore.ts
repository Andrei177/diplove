import { create } from "zustand";

interface ILoginStore{
    id: number | null,
    login: string,
    password: string,
    setId: (newId: number) => void,
    setLogin: (newLogin: string) => void,
    setPassword: (newPassword: string) => void,
    isLoading: boolean,
    setIsLoading: (bool: boolean) => void,
}

export const useLoginStore = create<ILoginStore>(set => ({
    id: null,
    login: "",
    password: "",
    setId: (newId) => set({id: newId}),
    setLogin: (newLogin) => set({login: newLogin}),
    setPassword: (newPassword) => set({password: newPassword}),
    isLoading: false,
    setIsLoading: (bool) => set({isLoading: bool}),
}))