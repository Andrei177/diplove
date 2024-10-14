import { $privateApi } from "../../../app/api/privateApi";
import { Genders } from "../store";

export const createAnketFn = async (first_name: string, gender: string, birthday: string, dating_purpose: string) => {
    const response = await $privateApi.post("/profiles/create/", {
        first_name,
        last_name: "Ляпин",
        gender,
        birthday,
        dating_purpose,
        searching_gender: gender === Genders.MALE ? Genders.FEMALE : gender
    });
    return response;
}