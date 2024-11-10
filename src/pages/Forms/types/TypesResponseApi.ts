export interface IImage {
    id: number;
    image: string;
    is_main_image: boolean;
}

export interface IHobbies{
    id: number;
    name: string;
}

export interface IProfileResponse{
    id: number | null,
    first_name: string,
    last_name: string,
    gender: string, 
    birthday: string, 
    dating_purpose: string, 
    searching_gender: string, 
    description: string, 
    smokes_cigarettes: boolean | null, 
    drinks_alcoholics: boolean | null, 
    zodiac_signs: string, 
    education: string, 
    job: string, 
    age: number | null, 
    is_active: boolean | undefined,
    images: IImage[];
    hobbies: IHobbies[];
}