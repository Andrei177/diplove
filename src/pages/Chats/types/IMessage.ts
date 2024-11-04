export interface IMessage {
  id: number;
  chat_id: number;
  sender_id: number;
  text: string;
  datetime: string;
}