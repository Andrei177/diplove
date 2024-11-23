import { create } from "zustand";
import { IMessage } from "../types/IMessage";
import { IChatInfo, IChatsListStore } from "../types/IChats";
import { IUserActivity } from "../types/IUserActivity";

export const useChatsListStore = create<IChatsListStore>((set, get) => ({
    chats: [],
    setChats: (newChats) => set({chats: newChats}),
    updateChats: (chat_id, last_message_datetime, last_message_text, last_message_first_name, unseen_messages_length) => {
        const newChats = get().chats.map(chat => {
            let candidate: IChatInfo = chat;
            if(candidate.chat_id === chat_id){
                candidate.last_message_datetime = last_message_datetime;
                candidate.last_message_text = last_message_text;
                candidate.unseen_messages_length = unseen_messages_length;
                candidate.last_message_first_name = last_message_first_name;
                return candidate
            }
            return chat;
        })
        set({chats: [...newChats]})
    },
    updateUnseenChat: (chat_id, unseen_messages_length) => {
        const newChats = get().chats.map(chat => {
            let candidate: IChatInfo = chat;
            if(candidate.chat_id === chat_id){
                candidate.unseen_messages_length = unseen_messages_length;
                return candidate
            }
            return chat;
        })
        set({chats: [...newChats]})
    },
    // updateActivityChats: (usersActivity) => {
    //     const newChats = get().chats.map(chat => {
    //         let someChat: IChatInfo = chat;
    //         let candidate = usersActivity.find(activity => activity.chat_id == someChat.chat_id)
    //         if(candidate){
    //             someChat.other_user_is_online = candidate.other_user_is_online;
    //             someChat.other_user_last_activity = candidate.other_user_last_activity;
    //             return someChat
    //         }
    //         return chat;
    //     })
    //     set({chats: [...newChats]})
    // }
    
}))

interface IChatStore {
    chat_id: number | null;
    messages: IMessage[];
    other_profile_first_name: string;
    other_profile_image: string;
    setOtherProfileFirstName: (newFirstName: string) => void;
    setOtherProfileImage: (newProfileImage: string) => void;
    setChatId: (newId: number | null) => void;
    setMessages: (newMsgs: IMessage[]) => void;
    addMessage: (newMsg: IMessage) => void;
    setEmpty: () => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
    chat_id: null,
    other_profile_first_name: "",
    other_profile_image: "",
    messages: [],
    setChatId: (newId) => set({chat_id: newId}),
    setOtherProfileFirstName: (newFirstName) => set({other_profile_first_name: newFirstName}),
    setOtherProfileImage: (newProfileImage) => set({other_profile_image: newProfileImage}),
    setMessages: (newMsgs) => set({messages: newMsgs}),
    addMessage: (newMsg) => set({messages: [...get().messages, newMsg]}),
    setEmpty: () => set({chat_id: null, other_profile_first_name: "", other_profile_image: "", messages: []})
}))

interface IUsersActivity{
    usersActivity: IUserActivity[];
    setUsersActivity: (newActivity: IUserActivity[]) => void;
}

export const useUsersActivity = create<IUsersActivity>(set => ({
    usersActivity: [],
    setUsersActivity: (newActivity) => set({usersActivity: newActivity})
}))


interface IUnseenChatsStore {
    unseenChats: number;
    setUnseenChats: (newCount: number) => void;
}

export const useUnseenChats = create<IUnseenChatsStore>(set => ({
    unseenChats: 0,
    setUnseenChats: (newCount) => set({unseenChats: newCount})
}))