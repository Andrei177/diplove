import { useEffect, useState } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import s from "./Chats.module.css"
import { getChats } from "../api/api"
import { useChatsListStore, useChatStore } from "../store/store"
import { useAuthStore } from "../../../app/store/store"
import { useMediaQuery } from "react-responsive"
import { Sidebar } from "./Sidebar/Sidebar"
import { Chat } from "./Chat/Chat"

export const Chats = () => {

  const { setChats } = useChatsListStore();


  const setHasRefreshed = useAuthStore(state => state.setHasRefreshed);
  const [text, setText] = useState("");

  const isMobile = useMediaQuery({ maxWidth: "625px" });

  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const { chat_id, addMessage } = useChatStore();

  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    getChats()
      .then(res => setChats(res))
      .catch(err => {
        console.log(err, "Ошибка при получении чатов")
        setChats([]);
        if (err.status === 401) {
          setHasRefreshed(false)
        }
      })
  }, [])

  useEffect(() => {
    if (chat_id) {
      // Если сокет уже существует, закрываем его
      if (chatSocket) {
        chatSocket.close();
      }

      // Создаем новое подключение WebSocket для нового chat_id
      const socketChat = new WebSocket(
        `${import.meta.env.VITE_WSS_URL}/ws/chat/${chat_id}/?token=${localStorage.getItem("token")}`
      );

      socketChat.onopen = () => {
        console.log("Подключился к чату");
      };

      socketChat.onmessage = (event) => {
        const message = JSON.parse(event.data);
        addMessage(message.message)
      };

      socketChat.onerror = (error) => {
        console.error("Ошибка в чате:", error);
      };

      socketChat.onclose = () => {
        console.log("Соединение закрыто");
      };

      // Устанавливаем новый WebSocket
      setChatSocket(socketChat);

      // Очистка при размонтировании компонента
      return () => {
        socketChat.close();
      };
    }
  }, [chat_id]);

  const sendMessage = () => {
    if (!text) return
    chatSocket?.send(JSON.stringify({
      action: "send",
      data: {
        text: text,
        media: null
      }
    }))
    setText("");
  }

  return (
    <MainLayout>
      <div className={s.chats_component}>
        {
          isMobile
            ? showSidebar
              ? <Sidebar alone={true} setShowSidebar={setShowSidebar} />
              : <Chat alone={true} text={text} setText={setText} setShowSidebar={setShowSidebar} sendMessage={sendMessage} />
            : <>
              <Sidebar />
              <Chat text={text} setText={setText} sendMessage={sendMessage} />
            </>
        }
      </div>
    </MainLayout>
  )
}

export default Chats;