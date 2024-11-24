import { FC, ReactNode, useEffect } from "react"
import { useChatsListStore, useUnseenChats, useUsersActivity } from "../../pages/Chats/store/store";

interface IPropsWebSocketProvider {
    children: ReactNode
}

const WebSocketProvider: FC<IPropsWebSocketProvider> = ({ children }) => {

    const { setUsersActivity } = useUsersActivity();
    const { updateChats, updateUnseenChat } = useChatsListStore();
    const setUnseenChats = useUnseenChats(state => state.setUnseenChats);

    useEffect(() => {
        const socket = new WebSocket(`${import.meta.env.VITE_WSS_URL}/ws/chats/?token=${localStorage.getItem("token")}`);

        socket.onopen = () => {
            console.log('Connected to the WebSocket server');
        };

        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.type == "send.event.update") {
                if (msg.last_message_first_name && msg.last_message_datetime) {
                    updateChats(msg.chat_id, msg.last_message_datetime, msg.last_message_text, msg.last_message_first_name, msg.unseen_messages_length)
                }
                else if (msg.unseen_messages_length == 0) {
                    updateUnseenChat(msg.chat_id, msg.unseen_messages_length)
                }
            }
            if (msg.type == "send.active.users") {
                setUsersActivity(msg.chats_users_activity)
            }
            if(msg.type == "send.unseen.chats"){
                setUnseenChats(msg.unseen_chats || msg.unseen_chats_count);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Очистка при размонтировании компонента
        return () => {
            socket.close();
        };

    }, [])

    return (
        <main>
            {children}
        </main>
    )
}

export default WebSocketProvider
