import { IChatInfo } from "../types/IChats";

export const compareLastMsgDatetime = (a: IChatInfo, b: IChatInfo) => {
  const dateA = new Date(a.last_message_datetime);
  const dateB = new Date(b.last_message_datetime);

  // Проверяем, есть ли обе даты
  if (a.last_message_datetime && b.last_message_datetime) {
    return dateB.getTime() - dateA.getTime(); // Сортируем по убыванию
  }

  // Если a.last_message_datetime отсутствует, b считается более новым
  if (!a.last_message_datetime && b.last_message_datetime) {
    return 1; // b более новое сообщение
  }

  // Если b.last_message_datetime отсутствует, a считается более новым
  if (a.last_message_datetime && !b.last_message_datetime) {
    return -1; // a более новое сообщение
  }

  // Если обе даты отсутствуют, считаем их равными
  return 0;
};
