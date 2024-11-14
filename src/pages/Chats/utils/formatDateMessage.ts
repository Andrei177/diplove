export const formatDateMessage = (dateString: string): string => {
    const date = new Date(dateString);

    // Используем Intl.DateTimeFormat для форматирования времени с учетом часового пояса
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short', // Чтобы указать сокращенное имя часового пояса (например, UTC, MSK)
    };

    // Форматируем время с учетом локали 'ru-RU' и заданных опций
    const formattedTime = new Intl.DateTimeFormat('ru-RU', options).format(date);

    // Можно удалить часовой пояс (если он не нужен), оставив только время
    const time = formattedTime.split(' ')[0]; // Разделяем строку по пробелу и берём только время

    return time;
};