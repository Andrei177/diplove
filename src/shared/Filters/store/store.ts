import { create } from "zustand";

interface IFiltersStore {
    showFilters: boolean;
    setShowFilters: (bool: boolean) => void;
    minAge: number;
    maxAge: number;
    distance: number;
    setMinAge: (newValue: number) => void;
    setMaxAge: (newValue: number) => void;
    setDistance: (newValue: number) => void;
}

export const useFiltersStore = create<IFiltersStore>(set => ({
    showFilters: false,
    setShowFilters: (bool) => set({showFilters: bool}),
    minAge: 18,
    maxAge: 100,
    distance: 30,
    setMinAge: (newValue: number) => set({minAge: newValue}),
    setMaxAge: (newValue: number) => set({maxAge: newValue}),
    setDistance: (newValue: number) => set({distance: newValue})
}))