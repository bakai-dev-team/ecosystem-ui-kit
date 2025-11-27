import "./styles.scss";
import { Icon } from "../../assets/icons/Icon";
import { useDateRangePicker } from "./model/useDateRangePicker";
import { Modal } from "../Modal";
import { DateWheelPicker } from "../DateWheelPicker";
import { Button } from "../Button";

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

export interface DatePickerProps {
    onDateRangeChange: (range: DateRange) => void;
    className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onDateRangeChange, className = "" }) => {
    const {
        startDate,
        endDate,
        currentMonth,
        setCurrentMonth,
        handleDateSelect,
        generateDays,
        isInRange,
        isToday,
        formatDate,
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
    } = useDateRangePicker(onDateRangeChange);

    const days = generateDays();

    const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    return (
        <div className={`date-picker ${className}`}>
            <div className="inputs-block">
                <div className={`input-wrapper ${activeField === "start" ? "focused" : ""}`} onClick={() => {
                    setActiveField("start");
                    setTempDate(startDate ?? new Date());
                    setOpen(true);
                }}>
                    <Icon className="input-icon" type="calendar"/>
                    <span>от</span>
                    <input type="text" value={formatDate(startDate)} placeholder="ДД.ММ.ГГ" readOnly />
                </div>
                <div className={"blocks"}></div>
                <div className={`input-wrapper ${activeField === "end" ? "focused" : ""}`} onClick={() => {
                    setActiveField("end");
                    setTempDate(endDate ?? new Date());
                    setOpen(true);
                }}>
                    <Icon className="input-icon" type="calendar"/>
                    <span>до</span>
                    <input type="text" value={formatDate(endDate)} placeholder="ДД.ММ.ГГ" readOnly />
                </div>

            </div>


            <div className="calendar">
                <div className="header">
                    <Icon
                        className="icon-button arrow-left"
                        onClick={() =>
                            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
                        }
                        type="arrowRight"
                    />
                    <span>
                   {new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" })
                    .format(currentMonth)
                    .replace(" г.", "")}
                   </span>

                    <Icon
                        className="icon-button arrow-right"
                        onClick={() =>
                            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
                        }
                        type="arrowRight"
                    />
                </div>

                <div className="grid">
                    {weekdays.map((day) => (
                        <div key={day} className="day-header">{day}</div>
                    ))}

                    {days.map(({ date, isCurrentMonth }, idx) => {
                            const isFuture = date > new Date();
                        return (
                            <div
                                key={idx}
                                className={`day
                                ${!isCurrentMonth ? "other-month" : ""}
                                ${isFuture ? "disabled" : ""}
                                ${isInRange(date) ? "in-range" : ""}
                                ${isStartClass(date) ? "start" : ""}
                                ${isEndClass(date) ? "end" : ""}
                                ${isToday(date) ? "today" : ""}
                            `}
                                onClick={() => {
                                    if (isFuture) return;
                                    if (open) setTempDate(date);
                                    else handleDateSelect(date);
                                }}
                            >
                                {date.getDate()}
                            </div>
                        )
                    }

                    )}
                </div>
            </div>

            <Modal
                className="half-height"
                label={activeField === "start" ? "Дата от" : "Дата до"}
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <DateWheelPicker
                    value={tempDate ?? startDate ?? new Date()}
                    onChange={(date) => setTempDate(date)}
                />

                <div className="modal_buttons">
                    <Button
                        className="button"
                        size="lg"
                        variant="solid"
                        onClick={handleReset}
                    >
                        Сбросить
                    </Button>

                    <Button
                        className="button"
                        size="lg"
                        variant="primary"
                        onClick={handleApply}
                        disabled={tempDate ? tempDate > new Date() : false}
                    >
                        Применить
                    </Button>
                </div>
            </Modal>

        </div>
    );
};

