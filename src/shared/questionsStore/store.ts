import { create } from "zustand";
import { createAnketFn } from "./api/api";
import { AxiosResponse } from "axios";

export enum Interests {
  RELATIONSHIP = "RELATIONSHIP",
  FRIENDSHIP = "FRIENDSHIP",
  FLIRT = "FLIRT",
  UNRESOLVED = "UNRESOLVED",
}

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

interface IQuestionsStore {
  gender: string;
  firstName: string;
  birthday: string;
  interes: string;
  setGender: (newGender: string) => void;
  setFirstName: (newName: string) => void;
  setBirthday: (date: string) => void;
  setInteres: (newInteres: string) => void;
  createAnket: () => Promise<AxiosResponse>;
}

export const useQuestionsStore = create<IQuestionsStore>((set, get) => ({
  gender: Genders.MALE,
  firstName: "",
  birthday: "",
  interes: Interests.RELATIONSHIP,
  setGender: (newGender) => set({ gender: newGender }),
  setFirstName: (newName) => set({ firstName: newName }),
  setBirthday: (date) => set({ birthday: date }),
  setInteres: (newInteres) => set({ interes: newInteres }),
  createAnket: async () => createAnketFn(get().firstName, get().gender, get().birthday, get().interes)
}));
