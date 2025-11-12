import type { Meta, StoryObj } from "@storybook/react";
import  { useState } from "react";
import { CustomTabs } from "./index";
import "./styles.scss";

const meta: Meta<typeof CustomTabs> = {
    title: "UI/CustomTabs",
    component: CustomTabs,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        value: {
            control: "text",
            description: "Активное значение таба",
        },
        onChange: {
            action: "changed",
            description: "Срабатывает при смене вкладки",
        },
    },
};

export default meta;
type Story = StoryObj<typeof CustomTabs>;

const Template = (args: any) => {
    const [value, setValue] = useState(args.value || args.data[0].value);

    return (
        <div style={{ width: 400 }}>
            <CustomTabs
                {...args}
                value={value}
                onChange={(val) => {
                    setValue(val);
                    args.onChange(val);
                }}
            />
            <p style={{ textAlign: "center", marginTop: "12px" }}>
                Активный таб: <strong>{value}</strong>
            </p>
        </div>
    );
};

export const Default: Story = {
    render: Template,
    args: {
        data: [
            { label: "Первый", value: "first" },
            { label: "Второй", value: "second" },
            { label: "Третий", value: "third" },
        ],
        value: "first",
    },
};

export const DarkMode: Story = {
    render: Template,
    args: {
        data: [
            { label: "Аккаунт", value: "account" },
            { label: "Карты", value: "cards" },
            { label: "Настройки", value: "settings" },
        ],
        value: "cards",
    },
    decorators: [
        (Story) => (
            <div style={{ background: "#0A1A28", padding: "20px", borderRadius: "16px",color:"#FFFFFF" }}>
                <div className="dark">
                    <Story />
                </div>
            </div>
        ),
    ],
};
