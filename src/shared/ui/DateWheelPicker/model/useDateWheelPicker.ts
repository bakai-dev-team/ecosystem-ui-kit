import { useEffect, useRef, useState } from "react";

export const useDateWheelPicker = (initialDate: Date, onChange: (date: Date) => void) => {
    const [date, setDate] = useState(initialDate);

    const dayRef = useRef<HTMLDivElement>(null);
    const monthRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);

    const ITEM_HEIGHT = 48;

    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();

    const days = Array.from({ length: getDaysInMonth(date.getFullYear(), date.getMonth()) }, (_, i) => i + 1);

    const [activeDay, setActiveDay] = useState(date.getDate());
    const [activeMonth, setActiveMonth] = useState(date.getMonth());
    const [activeYear, setActiveYear] = useState(date.getFullYear());

    const snapScroll = (ref: React.RefObject<HTMLDivElement>, type: "day" | "month" | "year") => {
        if (!ref.current) return;

        const scrollTop = ref.current.scrollTop;
        const index = Math.round(scrollTop / ITEM_HEIGHT);

        const newDate = new Date(date);

        if (type === "day") {
            newDate.setDate(days[index] || days[days.length - 1]);
            setActiveDay(newDate.getDate());
        }

        if (type === "month") {
            newDate.setMonth(index);
            setActiveMonth(index);
        }

        if (type === "year") {
            newDate.setFullYear(years[index]);
            setActiveYear(years[index]);
        }

        const maxDays = getDaysInMonth(newDate.getFullYear(), newDate.getMonth());
        if (newDate.getDate() > maxDays) newDate.setDate(maxDays);

        setDate(newDate);
        onChange(newDate);
    };

    const handleScroll = (ref: React.RefObject<HTMLDivElement>, type: "day" | "month" | "year") => {
        return (e: React.UIEvent<HTMLDivElement>) => {
            clearTimeout((e.target as any)._scrollTimer);
            (e.target as any)._scrollTimer = setTimeout(() => snapScroll(ref, type), 120);
        };
    };

    useEffect(() => {
        if (dayRef.current) dayRef.current.scrollTop = (date.getDate() - 1) * ITEM_HEIGHT;
        if (monthRef.current) monthRef.current.scrollTop = date.getMonth() * ITEM_HEIGHT;
        if (yearRef.current) yearRef.current.scrollTop = years.indexOf(date.getFullYear()) * ITEM_HEIGHT;
    }, [date, days]);

    return {
        date,
        days,
        months,
        years,
        activeDay,
        activeMonth,
        activeYear,
        dayRef,
        monthRef,
        yearRef,
        handleScroll
    };
};
