export const formatTime = (time: string | Date) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDateLabel = (time: string | Date) => {
    const date = new Date(time);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    ) {
        return "Сегодня";
    } else if (
        date.getFullYear() === yesterday.getFullYear() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getDate() === yesterday.getDate()
    ) {
        return "Вчера";
    } else {
        return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "short", year: "numeric" });
    }
};
