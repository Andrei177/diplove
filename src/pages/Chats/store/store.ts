import { create } from "zustand";

interface IChatInfo {
    chat_id: number | null;
    last_message_text: string;
    messages_length: number | null;
    last_seen: string;
}

interface IChatsStore {
    chats: IChatInfo[];
    setChats: (newChats: IChatInfo[]) => void;
}

export const useChatsStore = create<IChatsStore>(set => ({
    chats: [],
    setChats: (newChats) => set({chats: newChats}),
}))