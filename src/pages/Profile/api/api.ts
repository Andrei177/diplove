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

    formData.append("image", image);
    formData.append("is_main_image", String(is_main_image));

    const response = await $privateApi.post<IImage>("/profile/image/add/", formData);

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