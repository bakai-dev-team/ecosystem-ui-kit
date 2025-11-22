import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AccountCard, type IData } from "./index";
import { IconProvider } from "../../shared/assets/icons/IconProvider";

const meta: Meta<typeof AccountCard> = {
    title: "UI/AccountCard",
    component: AccountCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AccountCard>;

const Template = () => {
    const [checked, setChecked] = useState<string[]>([]);

    const accounts: IData[] = [
        { id: "1", name: "ЛС 123456", sum: 5000, logo: "user" },
    ];

    const accountsTwo: IData[] = [
        { id: "2", name: "ЛС 987654", sum: 95000, logo: "user" },
    ];


    const handleOnClick = (id: string) => {
        console.log("Clicked:", id);
    };

    const handleCheckChange = (id: string, isChecked: boolean) => {
        setChecked((prev) =>
            isChecked ? [...prev, id] : prev.filter((x) => x !== id)
        );
    };

    return (
        <div style={{ width: "360px", padding: "20px" }}>
            <IconProvider />

            <AccountCard
                data={accounts}
                selectable
                checkedItems={checked}
                onCheckChange={handleCheckChange}
                onClick={handleOnClick}
            />

            <div style={{marginTop: "12px"}}>
                <AccountCard
                    data={accountsTwo}
                    checkedItems={checked}
                    onCheckChange={handleCheckChange}
                    onClick={handleOnClick}
                />
            </div>
        </div>
    );
};

export const Default: Story = {
    render: Template,
};
