import { FC } from "react"
import { IChatInfo } from "../store/store"
import s from "./ChatInfo.module.css"
import ava from "../../../assets/ava.svg"

interface IPropsChatInfo {
    chatInfo: IChatInfo;
    onClick: () => void;
}

export const ChatInfo: FC<IPropsChatInfo> = ({ chatInfo, onClick}) => {

    return (
        <div className={s.chat_info} onClick={onClick}>
            <div className={s.image}>
                <img className={s.img} src={chatInfo.other_profile_image ? "http://localhost:8000" + chatInfo.other_profile_image : ava} />
            </div>
            <div className={s.main_chat_info}>
                <h3 className={s.name}>{chatInfo.other_profile_first_name}</h3>
                <div className={s.msg_info}>
                    <div className={s.msg_text}>
                        {chatInfo.last_message_text 
                        ?
                            chatInfo.last_message_first_name !== chatInfo.other_profile_first_name 
                            ? "Вы: " + (chatInfo.last_message_text.length > 15 ? chatInfo.last_message_text.substring(0, 15) + "..." : chatInfo.last_message_text.length)
                            : chatInfo.last_message_text.length > 15 ? chatInfo.last_message_text.substring(0, 15) + "..." : chatInfo.last_message_text.length
                        : "Нет сообщений"}
                    </div>
                    <div className={s.msg_date}>
                        {chatInfo.last_message_datetime ? chatInfo.last_message_datetime : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}