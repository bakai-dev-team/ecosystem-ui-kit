import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";

import { Select } from "./index";
import { IconProvider } from "../../../shared/assets/icons/IconProvider";

import "../../../shared/assets/styles/styles.scss";
import { Modal } from "../Modal";
import { PurposeSelector } from "../PurposeSelector";

setupIonicReact();

const meta: Meta<typeof Select> = {
    title: "UI/Select",
    component: Select,
    parameters: {
        docs: {
            description: {
                component: "Компонент Select для выбора значения из выпадающего списка с модальным окном."
            }
        }
    },
    argTypes: {
        label: {
            description: "Текст лейбла для селекта",
            control: { type: "text" },
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Цель использования ТС" }
            }
        },
        value: {
            description: "Отображаемое значение выбранного варианта",
            control: { type: "text" },
            table: {
                type: { summary: "string" }
            }
        },
        onClick: {
            description: "Callback функция при клике на селект",
            table: {
                type: { summary: "() => void" }
            }
        },
        disabled: {
            description: "Отключенное состояние селекта",
            control: { type: "boolean" },
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" }
            }
        }
    }
};

export default meta;

/**
 * Базовый пример использования компонента Select.
 * Демонстрирует работу с выбором значения через модальное окно.
 */
export const Default: StoryObj<typeof Select> = {
    args: {
        label: "Цель использования ТС",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selected, setSelected] = useState("");

        const options = [
            { label: "Перевозка пассажиров", value: "passengers" },
            { label: "Личное использование", value: "personal" },
            { label: "Прочее", value: "other" },
        ];

        const handleSelect = (value: string) => {
            setSelected(value);
            setIsOpen(false);
        };

        useEffect(() => {
            if (isOpen && !selected && options.length > 0) {
                setSelected(options[0].value);
            }
        }, [isOpen]);

        return (
            <IonApp style={{ padding: "20px" }}>
                <IconProvider />

                <Select
                    {...args}
                    value={options.find((o) => o.value === selected)?.label || ""}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    label={args.label}
                >
                    <PurposeSelector
                        options={options}
                        selected={selected}
                        onSelect={handleSelect}
                    />
                </Modal>
            </IonApp>
        );
    },
};

/**
 * Пример селекта с предварительно выбранным значением
 */
export const WithPreselectedValue: StoryObj<typeof Select> = {
    args: {
        label: "Цель использования ТС",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selected, setSelected] = useState("personal");

        const options = [
            { label: "Перевозка пассажиров", value: "passengers" },
            { label: "Личное использование", value: "personal" },
            { label: "Прочее", value: "other" },
        ];

        const handleSelect = (value: string) => {
            setSelected(value);
            setIsOpen(false);
        };

        return (
            <IonApp style={{ padding: "20px" }}>
                <IconProvider />

                <Select
                    {...args}
                    value={options.find((o) => o.value === selected)?.label || ""}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    label={args.label}
                >
                    <PurposeSelector
                        options={options}
                        selected={selected}
                        onSelect={handleSelect}
                    />
                </Modal>
            </IonApp>
        );
    },
};

/**
 * Пример отключенного селекта
 */
export const Disabled: StoryObj<typeof Select> = {
    args: {
        label: "Цель использования ТС",
        disabled: true
    },
    render: (args) => {
        return (
            <IonApp style={{ padding: "20px" }}>
                <IconProvider />
                <Select {...args} />
            </IonApp>
        );
    },
};

/**
 * Пример селекта с кастомными опциями
 */
export const CustomOptions: StoryObj<typeof Select> = {
    args: {
        label: "Тип транспорта",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selected, setSelected] = useState("");

        const transportOptions = [
            { label: "Легковой автомобиль", value: "passenger_car" },
            { label: "Грузовой автомобиль", value: "cargo_truck" },
            { label: "Мотоцикл", value: "motorcycle" },
            { label: "Автобус", value: "bus" },
            { label: "Спецтехника", value: "special_equipment" },
        ];

        const handleSelect = (value: string) => {
            setSelected(value);
            setIsOpen(false);
        };

        return (
            <IonApp style={{ padding: "20px" }}>
                <IconProvider />

                <Select
                    {...args}
                    value={transportOptions.find((o) => o.value === selected)?.label || ""}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    label={args.label}
                >
                    <PurposeSelector
                        options={transportOptions}
                        selected={selected}
                        onSelect={handleSelect}
                    />
                </Modal>
            </IonApp>
        );
    },
};

/**
 * Пример селекта без выбранного значения
 */
export const Empty: StoryObj<typeof Select> = {
    args: {
        label: "Цель использования ТС",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selected, setSelected] = useState("");

        const options = [
            { label: "Перевозка пассажиров", value: "passengers" },
            { label: "Личное использование", value: "personal" },
            { label: "Прочее", value: "other" },
        ];

        const handleSelect = (value: string) => {
            setSelected(value);
            setIsOpen(false);
        };

        return (
            <IonApp style={{ padding: "20px" }}>
                <IconProvider />

                <Select
                    {...args}
                    value={options.find((o) => o.value === selected)?.label || ""}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    label={args.label}
                >
                    <PurposeSelector
                        options={options}
                        selected={selected}
                        onSelect={handleSelect}
                    />
                </Modal>
            </IonApp>
        );
    },
};