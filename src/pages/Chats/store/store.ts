import { create } from "zustand";
import { IMessage } from "../types/IMessage";
import { IChatsListStore } from "../types/IChats";

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