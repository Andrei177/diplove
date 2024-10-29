import { useEffect } from "react"
import { MainLayout } from "../../../shared/MainLayout"
import { Textarea } from "../../../shared/ui/Textarea/Textarea"
import s from "./Chats.module.css"
import { getChats } from "../api/api"
import { useChatsStore } from "../store/store"
import { formatDate } from "../utils/formatDate"

export const Chats = () => {

  const { chats, setChats } = useChatsStore();

  useEffect(() => {
    getChats()
    .then(res => setChats(res))
    .catch(err => console.log(err, "Ошибка при получении чатов"))
  }, [])

  return (
    <MainLayout>
      <div className={s.chats_component}>
        <div className={s.sidebar}>
          <hr/>
          <div className={s.sidebar_chats}>
            Сообщения
            {
              chats.length !== 0
              ? <>{chats.map(chatInfo => <h3>{chatInfo.chat_id} . в сети {formatDate(chatInfo.last_seen)}</h3>)}</>
              : <h3>Пока нет чатов</h3>
            }
          </div>
        </div>
        <div className={s.chat}>
          <div className={s.chat_user}>
            Инфа о пользователе с кем чат
          </div>
          <hr />
          <div className={s.messages}>
            Пока нет сообщений
          </div>
          <hr />
          <div className={s.chat_textarea}>
            <Textarea className={s.textarea} placeholder="Написать сообщение..."/>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
