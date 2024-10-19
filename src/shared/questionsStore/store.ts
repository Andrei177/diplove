import { create } from "zustand";
import { createAnketFn } from "./api/api";
import { AxiosResponse } from "axios";

export enum Interest {
  RELATIONSHIP = "RELATIONSHIP",
  FRIENDSHIP = "FRIENDSHIP",
  FLIRT = "FLIRT",
  UNRESOLVED = "UNRESOLVED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

interface IQuestionsStore {
  gender: string;
  searchingGender: string;
  firstName: string;
  birthday: string;
  interes: string;
  setGender: (newGender: string) => void;
  setSearchingGender: (newSearchingGender: string) => void;
  setFirstName: (newName: string) => void;
  setBirthday: (date: string) => void;
  setInteres: (newInteres: string) => void;
  createAnket: () => Promise<AxiosResponse>;
}

export const useQuestionsStore = create<IQuestionsStore>((set, get) => ({
  gender: Gender.MALE,
  searchingGender: Gender.FEMALE,
  firstName: "",
  birthday: "",
  interes: Interest.RELATIONSHIP,
  setGender: (newGender) => set({ gender: newGender }),
  setSearchingGender: (newSearchingGender) => set({ searchingGender: newSearchingGender }),
  setFirstName: (newName) => set({ firstName: newName }),
  setBirthday: (date) => set({ birthday: date }),
  setInteres: (newInteres) => set({ interes: newInteres }),
  createAnket: async () => createAnketFn(get().firstName, get().gender, get().searchingGender, get().birthday, get().interes)
}));
