import { $privateApi } from "../../../app/api/privateApi"
import { IChatInfo } from "../types/IChats";
import { IMessage } from "../types/IMessage";
import { IUserActivity } from "../types/IUserActivity";

export const getChats = async () => {
    const res = await $privateApi.get<IChatInfo[]>("/chat/list/");
    
    return res.data;
}

export const getMessages = async (chatId: number | null) => {
    if(chatId){
        const res = await $privateApi.get<IMessage[]>(`/chat/${chatId}/`)
        
        return res.data;
    }
    else{
        return Promise.reject();
    }
}

export const getChatsUsersActivity = async () => {
    const res = await $privateApi.get<IUserActivity[]>("/chat/users-activity/");

    return res.data;
}