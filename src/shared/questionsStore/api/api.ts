import { $privateApi } from "../../../app/api/privateApi";

export const createAnketFn = async (first_name: string, gender: string, searching_gender: string, birthday: string, dating_purpose: string) => {
    const response = await $privateApi.post("/profile/create/", {
        first_name,
        gender,
        birthday,
        dating_purpose,
        searching_gender
    });
    return response;
}