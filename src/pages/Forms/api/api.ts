import { $privateApi } from "../../../app/api/privateApi"
import { IProfileResponse } from "../types/TypesResponseApi";

export const getProfiles = async (radius: number, minAge: number, maxAge: number) => {
    const response = await $privateApi.get<IProfileResponse[]>(`/profile/search-profiles/?radius=${radius}&min_age=${minAge}&max_age=${maxAge}`);

    return response.data;
}