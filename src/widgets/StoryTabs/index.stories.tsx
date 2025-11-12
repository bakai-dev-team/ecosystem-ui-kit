import type { Meta, StoryObj } from "@storybook/react";
import { StoryTabs } from "./index";
import  { useState } from "react";

const meta: Meta<typeof StoryTabs> = {
    title: "UI/StoryTabs",
    component: StoryTabs,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        amount: {
            control: { type: "number" },
            description: "Количество сторисов",
            defaultValue: 5,
        },
        duration: {
            control: { type: "number" },
            description: "Длительность каждой сторис (в мс)",
            defaultValue: 3000,
        },
        onTabsOver: { action: "onTabsOver", description: "Вызывается после окончания всех сторисов" },
        onTabOver: { action: "onTabOver", description: "Вызывается после окончания одной сторис" },
    },
};

export default meta;
type Story = StoryObj<typeof StoryTabs>;



export const Default: Story = {
    render: (args) => {
        const [activeTab, setActiveTab] = useState(0);

        const handleTabOver = () => {
            console.log("Текущий таб закончен");
            setActiveTab((prev) => prev + 1);
        };

        const handleTabsOver = () => {
            console.log("Все сторисы закончились");
            setActiveTab(0);
        };

        return (
            <div style={{ width: 320 }}>
                <StoryTabs
                    {...args}
                    activeTab={activeTab}
                    onTabOver={handleTabOver}
                    onTabsOver={handleTabsOver}
                />
            </div>
        );
    },
    args: {
        amount: 5,
        duration: 3000,
    },
};



export const FastProgress: Story = {
    render: (args) => {
        const [activeTab, setActiveTab] = useState(0);

        return (
            <div style={{ width: 300 }}>
                <StoryTabs
                    {...args}
                    activeTab={activeTab}
                    onTabOver={() => setActiveTab((prev) => prev + 1)}
                    onTabsOver={() => setActiveTab(0)}
                />
            </div>
        );
    },
    args: {
        amount: 3,
        duration: 1000,
    },
};



export const SlowProgress: Story = {
    render: (args) => {
        const [activeTab, setActiveTab] = useState(0);

        return (
            <div style={{ width: 300 }}>
                <StoryTabs
                    {...args}
                    activeTab={activeTab}
                    onTabOver={() => setActiveTab((prev) => prev + 1)}
                    onTabsOver={() => setActiveTab(0)}
                />
            </div>
        );
    },
    args: {
        amount: 4,
        duration: 8000,
    },
};
