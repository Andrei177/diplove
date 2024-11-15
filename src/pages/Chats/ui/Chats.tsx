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

  // ПОДКЛЮЧЕНИЕ ПО ВЕБСОКЕТАМ НЕ РАБОТАЕТ

  const { setChats, updateChats, updateUnseenChat } = useChatsListStore();

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

    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chats/?token=${localStorage.getItem("token")}`);

    socket.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('Received message:', event);
      if(msg.last_message_first_name && msg.last_message_datetime){
        updateChats(msg.chat_id, msg.last_message_datetime, msg.last_message_text, msg.last_message_first_name, msg.unseen_messages_length)
      }
      else if(msg.unseen_messages_length == 0){
        updateUnseenChat(msg.chat_id, msg.unseen_messages_length)
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

  useEffect(() => {
    if (chat_id) {
      // Если сокет уже существует, закрываем его
      if (chatSocket) {
        chatSocket.close();
      }

      // Создаем новое подключение WebSocket для нового chat_id
      const socketChat = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${chat_id}/?token=${localStorage.getItem(
          "token"
        )}`
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
    if(!text) return
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
              ? <Sidebar alone={true} setShowSidebar={setShowSidebar}/>
              : <Chat alone={true} text={text} setText={setText} setShowSidebar={setShowSidebar} sendMessage={sendMessage}/>
            : <>
              <Sidebar />
              <Chat text={text} setText={setText} sendMessage={sendMessage}/>
            </>
        }
      </div>
    </MainLayout>
  )
}

export default Chats;

// const { chat_id, setMessages, setChatId, addMessage} = useChatStore();
  //const ws = useRef<WebSocket | null>(null);
  // useEffect(() => {

  //   // Функция для подключения к WebSocket
  //   const connectWebSocket = (chatId: number | null) => {
  //     if (chatId) {
  //       // Закрываем предыдущее соединение, если оно существует
  //       if (ws.current) {
  //         ws.current.close();
  //       }

  //       // Создаем новое соединение
  //       ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${chatId}/`);

  //       // Обрабатываем входящие сообщения
  //       ws.current.onmessage = (event: MessageEvent) => {
  //         const message = event.data;
  //         addMessage(message);
  //       };

  //       // Обрабатываем ошибки
  //       ws.current.onerror = (error) => {
  //         console.error("WebSocket Error:", error);
  //       };

  //       // Обрабатываем закрытие соединения
  //       ws.current.onclose = () => {
  //         console.log("WebSocket connection closed");
  //       };
  //     }
  //   };

  //   // Подключаемся к WebSocket при монтировании компонента
  //   connectWebSocket(chat_id);

  //   // Закрываем соединение при размонтировании компонента
  //   return () => {
  //     ws.current?.close();
  //   };

  // }, [chat_id])

  // const switchChat = (chatId: number | null) => {
  //   if (chatId){
  //     getMessages(chatId)
  //     .then(res => setMessages(res))
  //     .catch(err => console.log(err, "Ошибка при получении сообщений чата"))
  //     setChatId(chatId);
  //   } 
  // }

  // const sendMessage = () => {
  //   console.log("Отправка сообщения");
  //   ws.current?.send(text);
  //   setText("");
  // }
