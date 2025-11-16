import type { Meta, StoryObj } from "@storybook/react";
import { CheckCard } from "./index";
import type {TAnimatedStatusImgType} from "../../../widgets/AnimatedStatusImg";

const meta: Meta<typeof CheckCard> = {
    title: "UI/CheckCard",
    component: CheckCard,
    tags: ["autodocs"],
    args: {
        status: "success" as TAnimatedStatusImgType,
        text: "Исполнен!",
        amount: 2465,
        type: "ОСАГО",
        number: "2835001982815540",
        date: "11.03.25 15:12",
    },
    argTypes: {
        status: {
            control: "select",
            options: ["success", "in_progress", "error"],
        },
        amount: {
            control: { type: "number" },
        },
    },
};

export default meta;

type Story = StoryObj<typeof CheckCard>;

export const Default: Story = {};

export const Success: Story = {
    args: {
        status: "success",
        text: "Платёж выполнен",
        amount: 12000,
    },
};

export const Pending: Story = {
    args: {
        status: "in_progress",
        text: "Ожидает обработки",
    },
};

export const Error: Story = {
    args: {
        status: "error",
        text: "Ошибка! Платёж не прошёл",
    },
};
