import { $privateApi } from "../../../app/api/privateApi"
import { IProfileResponse } from "../../Forms/types/TypesResponseApi";

interface ILike {
    id: number;
    common: string;
    received_id: number;
    sender_id: 11;
}

export interface ILikesResponse {
    like: ILike;
    profile: IProfileResponse;
}

export const getLikes = async () => {
    const res = await $privateApi.get<ILikesResponse[]>("/profile/likes/");

    return res.data
} 