import { useEffect, useRef } from "react"
import { Message } from "../Message/Message"
import s from "./Messages.module.css"
import { useChatStore } from "../../store/store";

export const Messages = () => {

  // const messages: IMessage[] = [
  //   {id: 1, sender_id: 2, text: "Аууу", datetime: "15:21", chat_id: 1},
  //   {id: 2, sender_id: 2, text: "Привет", datetime: "16:23", chat_id: 1},
  //   {id: 3, sender_id: 2, text: "Как дела?", datetime: "17:17", chat_id: 1},
  //   {id: 4, sender_id: 11, text: "Хорошо", datetime: "17:17", chat_id: 1},
  //   {id: 4, sender_id: 11, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptatem dicta eos esse soluta numquam perferendis doloremque quos dolorum, cum totam commodi error sit ipsum? Voluptates aliquid neque tenetur mollitia.", datetime: "17:17", chat_id: 1},
  //   {id: 3, sender_id: 2, text: "Как дела?", datetime: "17:17", chat_id: 1},
  //   {id: 4, sender_id: 11, text: "Хорошо", datetime: "17:17", chat_id: 1},
  //   {id: 3, sender_id: 2, text: "Как дела?", datetime: "17:17", chat_id: 1},
  //   {id: 4, sender_id: 11, text: "Хорошо", datetime: "17:17", chat_id: 1},
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