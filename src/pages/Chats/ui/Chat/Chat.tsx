import { Textarea } from "../../../../shared/ui/Textarea/Textarea"
import { Messages } from "../Messages/Messages"
import s from "./Chat.module.css"
import send from "../../assets/send.svg"
import { FC, useEffect } from "react"
import cx from "classnames"
import back from "../../../../assets/back.svg"
import { useChatStore } from "../../store/store"
import ava from "../../../../assets/ava.svg"
import { getMessages } from "../../api/api"

interface IPropsChat {
    text: string;
    setText: (newText: string) => void;
    alone?: boolean;
    setShowSidebar?: (bool: boolean) => void;
    sendMessage: () => void;
}

export const Chat: FC<IPropsChat> = ({ text, setText, alone, setShowSidebar, sendMessage }) => {

    const { other_profile_image, other_profile_first_name, chat_id, setMessages } = useChatStore()

    useEffect(() => {
        if(chat_id){
            getMessages(chat_id)
            .then(res => setMessages(res))
            .catch(err => console.log(err, "Ошибка при получении сообщений чата"))
        }
    }, [chat_id])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === "Enter"){
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className={alone ? cx(s.chat, s.alone) : s.chat}>
            <div className={s.chat_user}>
                {alone && <div className={s.back_img}>
                    <img src={back} onClick={() => { if (setShowSidebar) { setShowSidebar(true) } }} />
                </div>}
                <div className={s.chat_user_info}>
                    <div className={s.image}>
                        <img className={s.img} src={other_profile_image ? "http://localhost:8000" + other_profile_image : ava} />
                    </div>
                    <div className={s.chat_user_name}>
                        {other_profile_first_name}
                    </div>
                </div>
            </div>
            {!alone && <hr />}
            <Messages />
            {!alone && <hr />}
            <div className={alone ? cx(s.chat_textarea, s.mobile_txt) : s.chat_textarea} onKeyDown={e => handleKeyDown(e)}>
                <Textarea
                    className={s.textarea}
                    placeholder="Написать сообщение..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <div className={s.send} onClick={sendMessage}>
                    <img src={send} />
                </div>
            </div>
        </div>
    )
}
