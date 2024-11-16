export const isDiffDays = (date1: string, date2: string) => {
    // Преобразуем даты в объекты Date (если переданы строки)
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Сравниваем только год, месяц и день
    return (
        d1.getFullYear() !== d2.getFullYear() ||
        d1.getMonth() !== d2.getMonth() ||
        d1.getDate() !== d2.getDate()
    );
}