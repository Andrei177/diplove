import { create } from "zustand";
import { IHobbies, IImage, ILocation, IProfileResponse } from "../../Forms/types/TypesResponseApi";

interface IProfileStore extends IProfileResponse{

    // actions
    setId: (newId: number) => void,
    setUserId: (newUserId: number) => void,
    setFirstName: (newFirstName: string) => void,
    setLastName: (newLastName: string) => void,
    setGender: (newGender: string) => void, 
    setBirthday: (newBirhday: string) => void, 
    setDatingPurpose: (newDatingPurpose: string) => void, 
    setSearchingGender: (newSearchingGender: string) => void, 
    setDescription: (newDescription: string) => void, 
    setSmokesCigarettes: (bool: boolean) => void, 
    setDrinksAlcoholics: (bool: boolean) => void, 
    setZodiacSigns: (newZodiacSigns: string) => void, 
    setEducation: (newEducation: string) => void, 
    setJob: (newJob: string) => void, 
    setAge: (newAge: number) => void, 
    setIsActive: (bool: boolean) => void,
    setAll: (profileData: IProfileResponse) => void,
    setAddress: (newAddress: string) => void,
    setImages: (newImages: IImage[]) => void, 
    setHobbies: (newHobbies: IHobbies[]) => void,
    setLocation: (newLocation: ILocation) => void,
}

export const useProfileStore = create<IProfileStore>((set) => ({
    id: null,
    user_id: null,
    first_name: "",
    last_name: "",
    gender: "", 
    birthday: "", 
    dating_purpose: "", 
    searching_gender: "", 
    description: "", 
    smokes_cigarettes: null, 
    drinks_alcoholics: null, 
    zodiac_signs: "", 
    education: "", 
    job: "", 
    age: null, 
    is_active: undefined, 
    address: "",
    images: [],
    hobbies: [],
    location: {
        latitude: 53.196860,
        longitude: 50.158323
    },

    setId: (newId) => set({id: newId}),
    setUserId: (newUserId) => set({user_id: newUserId}),
    setFirstName: (newFirstName) => set({first_name: newFirstName}),
    setLastName: (newLastName) => set({last_name: newLastName}),
    setGender: (newGender) => set({gender: newGender}), 
    setBirthday: (newBirhday) => set({birthday: newBirhday}), 
    setDatingPurpose: (newDatingPurpose) => set({dating_purpose: newDatingPurpose}), 
    setSearchingGender: (newSearchingGender) => set({searching_gender: newSearchingGender}), 
    setDescription: (newDescription) => set({description: newDescription}), 
    setSmokesCigarettes: (bool) => set({smokes_cigarettes: bool}), 
    setDrinksAlcoholics: (bool) => set({drinks_alcoholics: bool}), 
    setZodiacSigns: (newZodiacSigns) => set({zodiac_signs: newZodiacSigns}), 
    setEducation: (newEducation) => set({education: newEducation}), 
    setJob: (newJob) => set({job: newJob}), 
    setAge: (newAge) => set({age: newAge}), 
    setIsActive: (bool) => set({is_active: bool}),
    setAddress: (newAddress) => set({address: newAddress}),
    setImages: (newImages) => set({images: newImages}), 
    setHobbies: (newHobbies) => set({hobbies: newHobbies}),
    setLocation: (newLocation) => set({location: {...newLocation}}),


    setAll: (profileData) => set({...profileData})
}))