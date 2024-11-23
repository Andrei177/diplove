import { $privateApi } from "../../../app/api/privateApi"
import { IImage, IProfileResponse } from "../../Forms/types/TypesResponseApi";
import { IArgsUpdate } from "../types/IArgsUpdate";

export const getMyProfile = async () => {
    const response = await $privateApi.get<IProfileResponse>("/profile/full-info/me/");

    return response.data
}

export const updateProfile = async (profileData: IArgsUpdate) => {
    const response = await $privateApi.patch("/profile/update/", {
        ...profileData
    });

    return response.data;
}

export const addImage = async (image: Blob, is_main_image: boolean = false) => {
    const formData = new FormData();

    formData.append("image_1", image);
    formData.append("is_main_image_1", String(is_main_image));

    const response = await $privateApi.post<IImage[]>("/profile/images/add/", formData);

    return response.data;
}
export const addImages = async (images: Blob[], withAvatarImage: boolean = false ) => {
    const formData = new FormData();

    if(withAvatarImage){
        images.forEach((img, i) => {
            formData.append(`image_${i + 1}`, img)
            if(i == (images.length - 1)){
                formData.append(`is_main_image_${i + 1}`, "true");
            } else {
                formData.append(`is_main_image_${i + 1}`, "false");
            }
        })
    }
    else{
        images.forEach((img, i) => {
            formData.append(`image_${i + 1}`, img)
            formData.append(`is_main_image_${i + 1}`, "false");
        })
    }

    const response = await $privateApi.post<IImage[]>("/profile/images/add/", formData);

    return response.data;
}

export const getImages = async () => {
    const response = await $privateApi.get<IImage[]>("/profile/images/");

    return response.data;
}

export const logout = async () => {
    const res = await $privateApi.get("/user/logout/");

    return res.data;
}

export const deleteProfile = async () => {
    const res = await $privateApi.delete("/user/delete/");

    return res.data;
}