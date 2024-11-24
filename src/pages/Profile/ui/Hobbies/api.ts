import { $privateApi } from "../../../../app/api/privateApi"
import { IHobbies } from "../../../Forms/types/TypesResponseApi"

export interface IHobbiesProcessed extends IHobbies{
    selected: boolean;
}

export const getHobbiesList = async () => {
    const res = await $privateApi.get<IHobbiesProcessed[]>("/profile/hobbies-list/")

    res.data.map(hobby => hobby.selected = false)

    return res.data
}

export const getProfileHobby = async () => {
    const res = await $privateApi.get<IHobbies[]>("/profile/hobbies/");

    return res.data
}

export const addHobbies = async (hobbies: IHobbies[]) => {
    const res = await $privateApi.post<IHobbies[]>("/profile/hobbies/add/", hobbies)

    return res.data
}

export const deleteHobbies = async (hobbies: IHobbies[]) => {

    const hobbiesIds = []

    hobbies.forEach(h => hobbiesIds.push({id: h.id}))

    const res = await $privateApi.post("profile/hobbies/delete/", )

    return res.data
}