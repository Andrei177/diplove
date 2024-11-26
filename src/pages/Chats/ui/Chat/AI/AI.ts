import { IMessage } from "../../../types/IMessage";
import { $privateApi } from "../../../../../app/api/privateApi";

interface IResponseAI {
  chat_id: number,
  text: string,
  user_id: number,
}

export const generateAnswerAI = async (lastMessages: IMessage[], meId: number, chat_id: number) => { 
    const res = await $privateApi.post<IResponseAI>("chat/generate-answer/", {
      last_messages: lastMessages,
      me_id: meId,
      chat_id
    })

    return res.data
}