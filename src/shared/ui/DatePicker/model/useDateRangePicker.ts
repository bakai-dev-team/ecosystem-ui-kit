import { useEffect, useState } from "react";

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

export interface DayCell {
    date: Date;
    isCurrentMonth: boolean;
}

export const useDateRangePicker = (onChange?: (range: DateRange) => void) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [tempDate, setTempDate] = useState<Date | null>(null);
    const [activeField, setActiveField] = useState<"start" | "end" | null>(null);

    const normalizeDate = (date: Date | null) =>
        date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() : null;

    const formatDate = (date: Date | null) => date ? date.toLocaleDateString("ru-RU") : "";

    const handleDateSelect = (date: Date) => {
        if (!startDate) {
            setStartDate(date);
            setEndDate(null);
            onChange?.({ startDate: date, endDate: null });

            return;
        }

        if (startDate && !endDate) {
            if (normalizeDate(date)! >= normalizeDate(startDate)!) {
                setEndDate(date);
                onChange?.({ startDate, endDate: date });
            } else {
                setStartDate(date);
                setEndDate(null);
                onChange?.({ startDate: date, endDate: null });

            }
            return;
        }

        setStartDate(date);
        setEndDate(null);
        onChange?.({ startDate: date, endDate: null });
    };

    const generateDays = (): DayCell[] => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevMonthLastDay = new Date(year, month, 0);

        const firstDayOfWeek = firstDay.getDay();
        const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

        const daysInMonth = lastDay.getDate();
        const daysInPrevMonth = prevMonthLastDay.getDate();

        const days: DayCell[] = [];

        for (let i = startDay - 1; i >= 0; i--) {
            days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }

        while (days.length % 7 !== 0) {
            days.push({ date: new Date(year, month + 1, days.length - daysInMonth - startDay + 1), isCurrentMonth: false });
        }

        return days;
    };

    const isInRange = (date: Date) =>
        startDate && endDate && normalizeDate(date)! >= normalizeDate(startDate)! && normalizeDate(date)! <= normalizeDate(endDate)!;

    const isToday = (date: Date) =>
        normalizeDate(date) === normalizeDate(new Date());

    const handleApply = () => {
        if (!tempDate) {
            closeModal();
            return;
        }
        handleDateSelect(tempDate);

        setTempDate(null);
        closeModal();
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        onChange?.({ startDate: null, endDate: null });
        closeModal();
    };

    const closeModal = () => {
        setTempDate(null);
        setActiveField(null);
        setOpen(false);
    };

    const isStartClass = (date: Date) => {
        const t = normalizeDate(date);
        if (open && tempDate && activeField === "start") return t === normalizeDate(tempDate);
        if (open && activeField === "end") return startDate ? t === normalizeDate(startDate) : false;
        return startDate ? t === normalizeDate(startDate) : false;
    };

    const isEndClass = (date: Date) => {
        const t = normalizeDate(date);
        if (open && tempDate && activeField === "end") return t === normalizeDate(tempDate);
        if (open && activeField === "start") return endDate ? t === normalizeDate(endDate) : false;
        return endDate ? t === normalizeDate(endDate) : false;
    };

    useEffect(() => {
        if (!startDate) {
            setActiveField("start");
        } else if (startDate && !endDate) {
            setActiveField("end");
        } else {
            setActiveField(null);
        }
    }, [startDate, endDate]);

    return {
        startDate,
        endDate,
        currentMonth,
        setCurrentMonth,
        formatDate,
        handleDateSelect,
        generateDays,
        isInRange,
        isToday,
        activeField,
        setActiveField,
        setTempDate,
        setOpen,
        open,
        isStartClass,
        isEndClass,
        tempDate,
        handleReset,
        handleApply,
    };
};
