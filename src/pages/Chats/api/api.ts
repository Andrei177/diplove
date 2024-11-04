import { $privateApi } from "../../../app/api/privateApi"
import { IChatInfo } from "../types/IChats";
import { IMessage } from "../types/IMessage";

export const getChats = async () => {
    const res = await $privateApi.get<IChatInfo[]>("/chat/list/");
    console.log(res.data, "чаты");
    
    return res.data;
}

export const getMessages = async (chatId: number | null) => {
    if(chatId){
        const res = await $privateApi.get<IMessage[]>(`chat/${chatId}/`)
        
        return res.data;
    }
    else{
        return Promise.reject();
    }
}