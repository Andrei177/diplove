import { FC, useEffect, useState } from "react"
import { IChatInfo } from "../types/IChats";
import s from "./ChatInfo.module.css"
import ava from "../../../assets/ava.svg"
import { useMediaQuery } from "react-responsive";
import { useUsersActivity } from "../store/store";
import { BACKEND_URL } from "../../../app/api/privateApi";
import { formatChatInfoDate } from "../utils/formatDateChatInfo";

interface IPropsChatInfo {
    chatInfo: IChatInfo;
    onClick?: () => void;
}

export const ChatInfo: FC<IPropsChatInfo> = ({ chatInfo, onClick }) => {

    const isPlanshet = useMediaQuery({ maxWidth: "685px" });
    const isMobile = useMediaQuery({ maxWidth: "625px" });

    const { usersActivity } = useUsersActivity();

    const [online, setOnline] = useState(false);

    useEffect(() => {
        const candidate = usersActivity.find(activity => activity.chat_id == chatInfo.chat_id)
        if (candidate) {
            setOnline(candidate.other_user_is_online);
        }
    }, [usersActivity])

    return (
        <div className={s.chat_info} onClick={onClick}>
            <div className={s.image_wrapper}>
                <div className={s.image}>
                    <img className={s.img} src={chatInfo.other_profile_image ? BACKEND_URL + chatInfo.other_profile_image : ava} />
                    {
                        online && <div className={s.online} />
                    }
                </div>
            </div>
            {(isMobile || (!isPlanshet && !isMobile)) &&
                <div className={s.main_chat_info}>
                    <div className={s.name_date}>
                        <h3 className={s.name}>{chatInfo.other_profile_first_name}</h3>
                        <div className={s.msg_date}>
                            {chatInfo.last_message_datetime ? formatChatInfoDate(chatInfo.last_message_datetime) : ""}
                        </div>
                    </div>
                    <div className={s.msg_info}>
                        <div className={s.msg_text}>
                            {
                                chatInfo.last_message_text
                                    ? <>
                                        <h4 className={s.last_msg_name}>{chatInfo.last_message_first_name}: </h4>
                                        {(chatInfo.last_message_text.length > 15 ? chatInfo.last_message_text.substring(0, 15) + "..." : chatInfo.last_message_text)}
                                    </>
                                    : "Нет сообщений"
                            }
                        </div>
                        {
                            chatInfo.unseen_messages_length !== 0 &&
                            <div className={s.msg_unseen_length}>
                                {chatInfo.unseen_messages_length}
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}