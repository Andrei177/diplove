import { useEffect, useRef } from "react"
import { Message } from "../Message/Message"
import s from "./Messages.module.css"
import { useChatStore } from "../../store/store"

export const Messages = () => {

  // const messages: IMessage[] = [
  //   {id: 1, sender: 2, text: "Аууу", datetime: "15:21", chat: 1},
  //   {id: 2, sender: 2, text: "Привет", datetime: "16:23", chat: 1},
  //   {id: 3, sender: 2, text: "Как дела?", datetime: "17:17", chat: 1},
  //   {id: 4, sender: 1, text: "Хорошо", datetime: "17:17", chat: 1},
  // ]
  const { messages } = useChatStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages])

  return (
    <div className={s.messages} ref={scrollRef}>
      <div className={s.msgs}>
        {
          messages.length !== 0
            ? messages.map(msg => <Message message={msg} key={msg.id}/>)
            : "Пока нет сообщений"
        }
      </div>
    </div>
  )
}