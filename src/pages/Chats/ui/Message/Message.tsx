import { FC } from "react";
import s from "./Message.module.css"
import cx from "classnames"
import { IMessage } from "../../types/IMessage";
import { useProfileStore } from "../../../Profile/store/store";
import { formatDateMessage } from "../../utils/formatDateMessage";
import { getDayMonth } from "../../utils/getDayMonth";

interface IPropsMessage {
  message: IMessage;
  nextDayMsg?: IMessage;
}

export const Message: FC<IPropsMessage> = ({ message, nextDayMsg }) => {

  const id = useProfileStore(state => state.user_id);
  // console.log(id, 'мой id');

  return (
    <>
    {nextDayMsg && <div className={s.next_day}>{getDayMonth(nextDayMsg.datetime)}</div>}
      <div className={cx(s.message_wrapper, message.sender_id === id && s.me)}>
        <div className={cx(s.message, message.sender_id === id && s.me)}>
          <div className={s.text}>
            {message.text}
          </div>
          <div className={cx(s.date, message.sender_id === id && s.me)}>
            {formatDateMessage(message.datetime)}
          </div>
        </div>
      </div>
    </>
  )
}