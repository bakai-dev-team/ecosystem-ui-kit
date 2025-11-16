import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedStatusImg } from "./index";

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
        size: {
            control: { type: "select" },
            options: ["sm", "md", "lg"],
            description: "Размер анимации",
        },
    },
};

export default meta;
type Story = StoryObj<typeof AnimatedStatusImg>;


export const Success: Story = {
    args: {
        status: "success",
        loop: false,
        size: "md",
    },
};

export const Error: Story = {
    args: {
        status: "error",
        loop: false,
        size: "md",
    },
};

export const InProgress: Story = {
    args: {
        status: "in_progress",
        loop: true,
        size: "md",
    },
};

export const ConfirmPayment: Story = {
    args: {
        status: "confirm_payment",
        loop: false,
        size: "md",
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
                <AnimatedStatusImg status="success" size="sm" />
                <div>Small (sm)</div>
            </div>
            <div style={{ textAlign: "center" }}>
                <AnimatedStatusImg status="success" size="md" />
                <div>Medium (md)</div>
            </div>
            <div style={{ textAlign: "center" }}>
                <AnimatedStatusImg status="success" size="lg" />
                <div>Large (lg)</div>
            </div>
        </div>
    ),
};

// Демонстрация всех статусов
export const AllStatuses: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
                <AnimatedStatusImg status="success" />
                <div>Success</div>
            </div>
            <div style={{ textAlign: "center" }}>
                <AnimatedStatusImg status="error" />
                <div>Error</div>
            </div>
            <div style={{ textAlign: "center" }}>
                <AnimatedStatusImg status="in_progress" loop={true} />
                <div>In Progress</div>
            </div>
            <div style={{ textAlign: "center" }}>
                <AnimatedStatusImg status="confirm_payment" />
                <div>Confirm Payment</div>
            </div>
        </div>
    ),
};