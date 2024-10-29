import { $privateApi } from "../../../app/api/privateApi"

export const createChat = async (profile_id: number) => {
    const res = await $privateApi.post("/profile/create-chat/", {profile_id})

    return res.data;
}