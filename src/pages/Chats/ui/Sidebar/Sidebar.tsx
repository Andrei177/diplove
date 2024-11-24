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
    const isMobile = useMediaQuery({ maxWidth: "625px" });
    const { chats } = useChatsListStore();
    const { setChatId, setOtherProfileFirstName, setOtherProfileImage, setMessages } = useChatStore();

    const handleClickOnChatInfo = (chatInfo: IChatInfo) => {

        if (setShowSidebar) setShowSidebar(false)
        setChatId(chatInfo.chat_id)
        setOtherProfileFirstName(chatInfo.other_profile_first_name)
        setOtherProfileImage(chatInfo.other_profile_image)
        if (isMobile) {
            setMessages([])
        }
    }

    return (
        <div className={alone ? cx(s.sidebar, s.alone) : s.sidebar}>
            <h2 className={s.chats_title}>Чаты</h2>
            {!isMobile && <hr />}
            <div className={s.sidebar_chats}>
                {
                    chats.length !== 0
                        ? <>{chats.sort(compareLastMsgDatetime).map(chatInfo => <ChatInfo key={chatInfo.chat_id} chatInfo={chatInfo} onClick={() => handleClickOnChatInfo(chatInfo)} />)}</>
                        : <h3 className={s.empty_in_chats}>Здесь пока пусто…</h3>
                }
            </div>
        </div>
    )
})
