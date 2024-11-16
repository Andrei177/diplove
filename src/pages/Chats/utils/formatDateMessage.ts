export const formatDateMessage = (dateString: string): string => {
    const date = new Date(dateString);

    // Опции форматирования для часов и минут
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    // Форматируем дату с учётом локали 'ru-RU' и часового пояса
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
};