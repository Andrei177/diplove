export const formatChatInfoDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();

    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    // Если разница меньше 24 часов
    if (diffInHours < 24) {
        // Форматируем время в HH:mm
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Если разница больше или равна 24 часов, форматируем дату в "ДД МММ"
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
}