import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedStatusImg,  } from "./index";

const meta: Meta<typeof AnimatedStatusImg> = {
    title: "UI/AnimatedStatusImg",
    component: AnimatedStatusImg,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        status: {
            control: { type: "select" },
            options: ["success", "error", "in_progress", "confirm_payment"],
            description: "Тип анимации статуса",
        },
        loop: {
            control: { type: "boolean" },
            description: "Зацикливать ли анимацию",
        },
    },
};

export default meta;
type Story = StoryObj<typeof AnimatedStatusImg>;


export const Success: Story = {
    args: {
        status: "success",
        loop: false,
    },
};


export const Error: Story = {
    args: {
        status: "error",
        loop: false,
    },
};

export const InProgress: Story = {
    args: {
        status: "in_progress",
        loop: true,
    },
};


export const ConfirmPayment: Story = {
    args: {
        status: "confirm_payment",
        loop: false,
    },
};
