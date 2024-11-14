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
    other_profile_first_name: string;
    other_profile_image: string;
    setOtherProfileFirstName: (newFirstName: string) => void;
    setOtherProfileImage: (newProfileImage: string) => void;
    setChatId: (newId: number | null) => void;
    setMessages: (newMsgs: IMessage[]) => void;
    addMessage: (newMsg: IMessage) => void;
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
    addMessage: (newMsg) => set({messages: [...get().messages, newMsg]})
}))