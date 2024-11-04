import { BACKEND_URL } from "../../app/api/privateApi"

export const getImageUrl = (partImageUrl: string) => {
    return BACKEND_URL + partImageUrl;
}