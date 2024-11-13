import { useEffect, useState } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import { Textarea } from "../../../shared/ui/Textarea/Textarea"
import s from "./Chats.module.css"
import { getChats } from "../api/api"
import { useChatsListStore } from "../store/store"
import { ChatInfo } from "./ChatInfo"
import { useAuthStore } from "../../../app/store/store"
import send from "../assets/send.svg"
import { Messages } from "./Messages/Messages"

export const Chats = () => {

  // ПОДКЛЮЧЕНИЕ ПО ВЕБСОКЕТАМ НЕ РАБОТАЕТ

  const { chats, setChats } = useChatsListStore();
  
  const setHasRefreshed = useAuthStore(state => state.setHasRefreshed);
  const [text, setText] = useState("");

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

      const socket = new WebSocket('ws://127.0.0.1:8000/ws/chats/');

    socket.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);
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
    <MainLayout>
      <div className={s.chats_component}>
        <div className={s.sidebar}>
          <hr />
          <div className={s.sidebar_chats}>
            Сообщения
            {
              chats.length !== 0
                ? <>{chats.map(chatInfo => <ChatInfo key={chatInfo.chat_id} chatInfo={chatInfo}/>)}</>
                : <h3>Пока нет чатов</h3>
            }
          </div>
        </div>
        <div className={s.chat}>
          <div className={s.chat_user}>
            Инфа о пользователе с кем чат
          </div>
          <hr />
          <Messages />
          <hr />
          <div className={s.chat_textarea}>
            <Textarea 
              className={s.textarea} 
              placeholder="Написать сообщение..." 
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <div className={s.send}>
              <img src={send} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

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
