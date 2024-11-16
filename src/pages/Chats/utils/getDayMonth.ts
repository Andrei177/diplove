export const getDayMonth = (date: string) => {
    // Преобразуем входную дату в объект Date (если передана строка)
    const d = new Date(date);

    // Список названий месяцев
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    // Получаем число и название месяца
    const day = d.getDate();
    const month = months[d.getMonth()];

    return `${day} ${month}`;
}