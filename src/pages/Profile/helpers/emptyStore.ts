import { IProfileResponse } from "../../Forms/types/TypesResponseApi";

export const emptyStore: IProfileResponse = {
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
    location: {
        latitude: 53.196860,
        longitude: 50.158323
    },
    images: [],
    hobbies: [],
}