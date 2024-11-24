import { $privateApi } from "../../../../app/api/privateApi"

export const delImg = async (imageId: number) => {
    const res = await $privateApi.delete(`profile/image/${imageId}/delete/`)

    return res.data;
}