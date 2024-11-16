export const formatDate = (dateString: string): string => {
    if(!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    // Если разница меньше 60 минут
    if (diffInMinutes < 60) {
        return `${diffInMinutes} мин. назад`;
    } 
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    
    // Если разница меньше 24 часов
    if (diffInHours < 24) {
        return `${diffInHours} ч назад`;
    } 
    
    // Если разница больше или равна 24 часов
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
}