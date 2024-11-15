import { useEffect, useRef } from "react"
import { Message } from "../Message/Message"
import s from "./Messages.module.css"
import { useChatStore } from "../../store/store";

export const Messages = () => {
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
            ? messages.map(msg => <Message message={msg} key={msg?.id}/>)
            : "Пока нет сообщений"
        }
      </div>
    </div>
  )
}