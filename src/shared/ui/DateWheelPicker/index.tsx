import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import {useDateWheelPicker} from "./model/useDateWheelPicker"

interface Props {
    value?: Date;
    onChange: (date: Date) => void;
}

export const DateWheelPicker: React.FC<Props> = ({ value = new Date(), onChange }) => {
    const {
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
    } = useDateWheelPicker(value, onChange);

    return (
        <div className="date-card">
            <div
                className="wheel-column"
                ref={dayRef}
                onScroll={handleScroll(dayRef, "day")}
            >
                {days.map(d => (
                    <div
                        key={d}
                        className={`wheel-item ${d === activeDay ? 'active' : ''}`}
                    >
                        {d}
                    </div>
                ))}
            </div>

            <div
                className="wheel-column"
                ref={monthRef}
                onScroll={handleScroll(monthRef, "month")}
            >
                {months.map((m, i) => (
                    <div
                        key={i}
                        className={`wheel-item ${i === activeMonth ? 'active' : ''}`}
                    >
                        {m}
                    </div>
                ))}
            </div>

            <div
                className="wheel-column"
                ref={yearRef}
                onScroll={handleScroll(yearRef, "year")}
            >
                {years.map(y => (
                    <div
                        key={y}
                        className={`wheel-item ${y === activeYear ? 'active' : ''}`}
                    >
                        {y}
                    </div>
                ))}
            </div>
        </div>
    );
};