export const formatDateMessage = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    // Вычисляем разницу в миллисекундах
    const differenceInMs = now.getTime() - date.getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000; // Количество миллисекунд в одном дне

    // Если разница больше суток
    if (differenceInMs > oneDayInMs) {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short', // Сокращенное название месяца
        };

        // Форматируем дату с учетом локали 'ru-RU' и заданных опций
        return new Intl.DateTimeFormat('ru-RU', options).format(date);
    }

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
