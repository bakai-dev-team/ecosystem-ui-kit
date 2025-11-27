import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NumberCategoryOptions} from "./index";
import { IconProvider } from "../../assets/icons/IconProvider";

const mockData = [
    { title: "Стандарт", sum: 200, value: "standard" },
    { title: "Голд", sum: 500, value: "gold" },
    { title: "Премиум", sum: 1000, value: "premium" },
];

const meta: Meta<typeof NumberCategoryOptions> = {
    title: "UI/NumberCategoryOptions",
    component: NumberCategoryOptions,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <>
                <IconProvider/>
                <div style={{ maxWidth: 400 }}>
                    <Story />
                </div>
            </>
        ),
    ],

    parameters: {
        docs: {
            description: {
                component:
                    "Компонент отображает список категорий сумм с возможностью выбора. Используется в UI для выбора тарифов, пакетов или лимитов.",
            },
        },
    },

};

export default meta;

type Story = StoryObj<typeof NumberCategoryOptions>;

export const Default: Story = {
    args: {
        data: mockData,
        selected: null,
    },
    render: (args) => {
        const [selected, setSelected] = useState<string | null>(args.selected);

        return (
            <NumberCategoryOptions
                {...args}
                selected={selected}
                onClick={(value) => setSelected(value)}
            />
        );
    },
};

export const Preselected: Story = {
    args: {
        data: mockData,
        selected: "premium",
    },
};

export const CustomData: Story = {
    args: {
        data: [
            { title: "Лимит 1000 сом", sum: 1000, value: "1000" },
            { title: "Лимит 5000 сом", sum: 5000, value: "5000" },
            { title: "Лимит 10 000 сом", sum: 10000, value: "10000" },
        ],
        selected: "5000",
    },
};

export const WithoutOnClick: Story = {
    args: {
        data: mockData,
        selected: null,
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Если передать компонент без `onClick`, он будет отображаться как статичный список.",
            },
        },
    },
};
