import { $privateApi } from "../../../app/api/privateApi"

export const getProfile = async () => {
    const response = await $privateApi.get("/profile/");

    return response.data
}

interface IArgsUpdate{
    id?: number | null,
    first_name?: string,
    last_name?: string,
    gender?: string, 
    birthday?: string, 
    dating_purpose?: string, 
    searching_gender?: string, 
    description?: string, 
    smokes_cigarettes?: boolean | null, 
    drinks_alcoholics?: boolean | null, 
    zodiac_signs?: string, 
    education?: string, 
    job?: string, 
    age?: number | null, 
    is_active?: boolean | null,
}

export const updateProfile = async (profileData: IArgsUpdate) => {
    const response = await $privateApi.patch("/profile/update/", {
        ...profileData
    });

    return response.data;
}

interface IResponseImage {
    id: number,
    image: string;
    is_main_image: boolean;
}

export const addImage = async (image: Blob, is_main_image: boolean = false) => {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("is_main_image", String(is_main_image));

    const response = await $privateApi.post<IResponseImage>("/profile/image/add/", formData);

    return response.data;
}

export const getImages = async () => {
    const response = await $privateApi.get<IResponseImage[]>("/profile/images/");

    return response.data;
}