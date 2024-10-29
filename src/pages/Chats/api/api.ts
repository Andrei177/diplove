import { $privateApi } from "../../../app/api/privateApi"

export const getChats = async () => {
    const res = await $privateApi.get("/chat/list/");

    return res.data;
}