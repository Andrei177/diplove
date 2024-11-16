import { useMediaQuery } from "react-responsive";
import { useChatsListStore, useChatStore } from "../../store/store";
import s from "./Sidebar.module.css"
import { ChatInfo } from "../ChatInfo";
import { FC, memo } from "react";
import cx from "classnames";
import { IChatInfo } from "../../types/IChats";
import { compareLastMsgDatetime } from "../../utils/CompareLastMsgDatetime";

interface IPropsSidebar {
    alone?: boolean;
    setShowSidebar?: (bool: boolean) => void;
}

export const Sidebar: FC<IPropsSidebar> = memo(({ alone, setShowSidebar }) => {

    const isPlanshet = useMediaQuery({ maxWidth: "685px" });
    const isMobile = useMediaQuery({ maxWidth: "625px" });
    const { chats } = useChatsListStore();
    const { setChatId, setOtherProfileFirstName, setOtherProfileImage, setMessages } = useChatStore();

    const handleClickOnChatInfo = (chatInfo: IChatInfo) => {

        if (setShowSidebar) setShowSidebar(false)
        setChatId(chatInfo.chat_id)
        setOtherProfileFirstName(chatInfo.other_profile_first_name)
        setOtherProfileImage(chatInfo.other_profile_image)
        if(isMobile){
            setMessages([])
        }
    }

    return (
        <div className={alone ? cx(s.sidebar, s.alone) : s.sidebar}>
            {
                isMobile
                    ? <h2>Чаты</h2>
                    : <hr />
            }
            <div className={s.sidebar_chats}>
                {(!isPlanshet || isMobile) && "Сообщения"}
                {
                    chats.length !== 0
                        ? <>{chats.sort(compareLastMsgDatetime).map(chatInfo => <ChatInfo key={chatInfo.chat_id} chatInfo={chatInfo} onClick={() => handleClickOnChatInfo(chatInfo)}/>)}</>
                        : <h3>Пока нет чатов</h3>
                }
            </div>
        </div>
    )
})
