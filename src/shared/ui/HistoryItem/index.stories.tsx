import type { Meta, StoryObj } from "@storybook/react";
import { HistoryItem, type IData } from "./index";
import Visa from "../../assets/svg-icons/visa_gold.svg"

const mockData: IData[] = [
    {
        id: "1",
        logo: Visa,
        name: "AtomPro",
        text: "Вывод средств",
        sum: 30000,
        time: new Date(),
        status: "success",
        type: "outcome",
    },
    {
        id: "2",
        logo: Visa,
        name: "PayBox",
        text: "Пополнение счета",
        sum: 15000,
        time: new Date(new Date().setDate(new Date().getDate() - 1)),
        status: "in_progress",
    },
    {
        id: "3",
        logo: Visa,
        name: "BankService",
        text: "Оплата товаров",
        sum: 5000,
        time: new Date(new Date().setDate(new Date().getDate() - 4)),
        status: "error",
    },
];

const meta: Meta<typeof HistoryItem> = {
    title: "UI/HistoryItem",
    component: HistoryItem,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HistoryItem>;

export const Default: Story = {
    args: {
        item: mockData,
        onClick: (id: string) => {
            console.log("Clicked transaction:", id);
        },
    },
};
