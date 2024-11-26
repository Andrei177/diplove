import { useEffect, useRef, useState } from "react"
import { Message } from "../Message/Message"
import s from "./Messages.module.css"
import { useChatStore } from "../../store/store"
import { isDiffDays } from "../../utils/isDiffDays"
import copy from "../../assets/copy.svg"
import star from "../../assets/star.svg"
import { useProfileStore } from "../../../Profile/store/store"
import { generateAnswerAI } from "../Chat/AI/AI"
import cx from "classnames"

export const Messages = () => {
  const { messages, chat_id } = useChatStore();
  const id = useProfileStore(state => state.user_id);

  const [generatedText, setGeneratedText] = useState<string>("");

  const handleGenerateAnswerAI = () => {
    if (id && chat_id) {
      generateAnswerAI([...messages.filter((_, i) => i >= messages.length - 7)], id, chat_id)
        .then(res => {
          setGeneratedText(res.text)
        })
        .catch(() => setGeneratedText("Возникла ошибка, попробуйте снова"))
    }
    else {
      console.log("Нет id у пользователя или chat_id");
    }
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
    setGeneratedText("");
  }

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, generatedText])

  return (
    <>
      <div className={s.messages} ref={scrollRef}>
        <div className={s.msgs}>
          {
            messages.length !== 0
              ? messages.map((msg, i) => {
                if (i == 0 || (i - 1 >= 0 && isDiffDays(msg.datetime, messages[i - 1].datetime))) {
                  return <Message message={msg} key={msg?.id} nextDayMsg={msg} />
                }
                return <Message message={msg} key={msg?.id} />
              })
              : "Пока нет сообщений"
          }
          {
            messages.length >= 7 &&
            <div className={generatedText.length > 0 ? cx(s.generate_wrapper, s.static) : s.generate_wrapper}>
              <div onClick={handleGenerateAnswerAI} className={s.star_wrapper}>
                <div className={s.question}>?</div>
                <img src={star} className={s.star_img} />
              </div>
              {generatedText.length > 0 &&
                <>
                  <div className={s.generated_text}>
                    {generatedText}
                  </div>
                  <img src={copy} className={s.copy} onClick={handleCopy} />
                </>}
            </div>
          }
        </div>
      </div>
    </>
  )
}