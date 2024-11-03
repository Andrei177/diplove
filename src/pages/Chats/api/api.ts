import { $privateApi } from "../../../app/api/privateApi"

export const getChats = async () => {
    const res = await $privateApi.get("/chat/list/");
    console.log(res.data);
    
    return res.data;
}

export const getMessages = async (chatId: number | null) => {
    if(chatId){
        const res = await $privateApi.get(`chat/${chatId}/`)
        
        return res.data;
    }
    else{
        return Promise.reject();
    }
}