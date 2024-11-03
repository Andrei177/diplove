import { create } from "zustand";
import { IMessage } from "../types/IMessage";

export interface IChatInfo {
    chat_id: number | null;
    last_message_text: string;
    last_message_datetime: string;
    last_message_first_name: string;
    other_profile_first_name: string;
    other_profile_image: string;
    unseen_messages_length: number;
}

interface IChatsListStore {
    chats: IChatInfo[];
    setChats: (newChats: IChatInfo[]) => void;
}

export const useChatsListStore = create<IChatsListStore>(set => ({
    chats: [],
    setChats: (newChats) => set({chats: newChats}),
}))

interface IChatStore {
    chat_id: number | null;
    messages: IMessage[];
    setChatId: (newId: number) => void;
    setMessages: (newMsgs: IMessage[]) => void;
    addMessage: (newMsg: IMessage) => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
    chat_id: null,
    messages: [],
    setChatId: (newId) => set({chat_id: newId}),
    setMessages: (newMsgs) => set({messages: newMsgs}),
    addMessage: (newMsg) => set({messages: [...get().messages, newMsg]})
}))