import { $privateApi } from "../../../app/api/privateApi"
import { IProfileResponse } from "../types/TypesResponseApi";

export const getProfiles = async (count: number, differenceAge: number) => {
    const response = await $privateApi.get<IProfileResponse[]>(`/profile/search-profiles/?profiles_count=${count}&allowed_age_difference=${differenceAge}`);

    return response.data;
}