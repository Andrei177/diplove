export interface IChatInfo {
    chat_id: number | null;
    last_message_text: string;
    last_message_datetime: string;
    last_message_first_name: string;
    other_profile_first_name: string;
    other_profile_image: string;
    unseen_messages_length: number;
}

export interface IChatsListStore {
    chats: IChatInfo[];
    setChats: (newChats: IChatInfo[]) => void;
    updateChats: (chat_id: number, last_message_datetime: string, last_message_text: string, last_message_first_name: string, unseen_messages_length: number) => void;
    updateUnseenChat: (chat_id: number, unseen_messages_length: number) => void;
}