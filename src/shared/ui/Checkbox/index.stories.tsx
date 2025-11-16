import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";

import { Checkbox } from "./index";
import { IconProvider } from "../../assets/icons/IconProvider";

import "../../assets/styles/styles.scss";

setupIonicReact();

const meta: Meta<typeof Checkbox> = {
    title: "UI/Checkbox",
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component: "Компонент Checkbox для отображения списка элементов с возможностью выбора и дополнительными действиями."
            }
        }
    },
    argTypes: {
        item: {
            description: "Массив элементов для отображения в виде чекбоксов",
            table: {
                type: {
                    summary: "CheckboxItem[]",
                    detail: "Array of { label: string, value: string, checked: boolean }"
                }
            }
        },
        onChange: {
            description: "Callback функция, вызываемая при изменении состояния чекбокса",
            table: {
                type: {
                    summary: "(id: string, checked: boolean) => void"
                }
            }
        },
        onActionClick: {
            description: "Callback функция, вызываемая при клике на кнопку действия",
            table: {
                type: {
                    summary: "() => void"
                }
            }
        }
    }
};

export default meta;

/**
 * Базовый пример использования компонента Checkbox.
 * Демонстрирует работу с массивом элементов, обработку изменений и кликов по действиям.
 */
export const Default: StoryObj = {
    render: () => {
        const [items, setItems] = useState([
            {
                label: "Перевозка пассажиров",
                value: "passenger_transport",
                checked: false
            },
            {
                label: "Личное использование",
                value: "personal_use",
                checked: true
            },
            {
                label: "Прочее",
                value: "other",
                checked: false
            },
        ]);

        /**
         * Обрабатывает изменение состояния чекбокса
         * @param value
         * @param checked - новое состояние чекбокса
         */
        const handleSelect = (value: string, checked: boolean) => {
            setItems(prev =>
                prev.map(item =>
                    item.value === value ? { ...item, checked } : item
                )
            );
        };

        /**
         * Обрабатывает клик по кнопке действия
         */
        const handleActionClick = () => {
            alert("Action button clicked");
        };

        return (
            <IonApp style={{ padding: "20px" }}>
                <IconProvider />
                <Checkbox
                    item={items}
                    onChange={handleSelect}
                    onActionClick={handleActionClick}
                />
            </IonApp>
        );
    },
};

/**
 * Пример с отключенными чекбоксами
 */
export const Disabled: StoryObj = {
    render: () => {
        const [items] = useState([
            {
                label: "Активный чекбокс",
                value: "active",
                checked: false
            },
            {
                label: "Отключенный чекбокс",
                value: "disabled",
                checked: true,
                disabled: true
            },
        ]);

        const handleSelect = (value: string, checked: boolean) => {
            console.log(`Checkbox ${value} changed to ${checked}`);
        };

        return (
            <IonApp style={{ padding: "20px" }}>
                <IconProvider />
                <Checkbox
                    item={items}
                    onChange={handleSelect}
                />
            </IonApp>
        );
    },
};

/**
 * Пример с группировкой чекбоксов
 */
export const Grouped: StoryObj = {
    render: () => {
        const [transportItems, setTransportItems] = useState([
            {
                label: "Легковой автомобиль",
                value: "car",
                checked: false
            },
            {
                label: "Грузовой автомобиль",
                value: "truck",
                checked: false
            },
        ]);

        const handleTransportSelect = (value: string, checked: boolean) => {
            setTransportItems(prev =>
                prev.map(item =>
                    item.value === value ? { ...item, checked } : item
                )
            );
        };

        return (
            <IonApp style={{ padding: "20px" }}>
                <IconProvider />
                <div style={{ marginBottom: "20px" }}>
                    <h3>Тип транспорта</h3>
                    <Checkbox
                        item={transportItems}
                        onChange={handleTransportSelect}
                    />
                </div>
            </IonApp>
        );
    },
};