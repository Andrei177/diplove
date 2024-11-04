import { $privateApi } from "../../../app/api/privateApi"

export const createLike = async (profile_id: number) => {
    const res = await $privateApi.post("/profile/like/create/", {profile_id})

    return res.data;
}