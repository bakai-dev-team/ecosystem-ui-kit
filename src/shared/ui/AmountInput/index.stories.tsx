import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AmountInput } from "./index";
import { IonApp, IonContent } from "@ionic/react";

const meta: Meta<typeof AmountInput> = {
    title: "UI/AmountInput",
    component: AmountInput,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: { control: "text", description: "Текст надписи (лейбл)" },
        amount: { control: "text", description: "Сумма" },
        error: { control: "boolean", description: "Флаг ошибки" },
        onAmountChange: { action: "amount changed" },
    },
};

export default meta;
type Story = StoryObj<typeof AmountInput>;

export const Default: Story = {
    render: (args) => {
        const [amount, setAmount] = useState("5000");

        return (
            <IonApp>
                <IonContent
                    className="ion-padding"
                    style={{ background: "var(--bg)", width:"400px" }}
                >
                    <AmountInput
                        {...args}
                        amount={amount}
                        onAmountChange={(val) => setAmount(val)}
                    />
                </IonContent>
            </IonApp>
        );
    },
    args: {
        label: "Сумма",
        error: false,
    },
};

export const ErrorState: Story = {
    render: (args) => {
        const [amount, setAmount] = useState("50");

        return (
            <IonApp>
                <IonContent className="ion-padding"  style={{ background: "var(--bg)", width:"400px" }}>
                    <AmountInput
                        {...args}
                        amount={amount}
                        onAmountChange={(val) => setAmount(val)}
                    />
                </IonContent>
            </IonApp>
        );
    },
    args: {
        label: "Минимум 100 сом",
        error: true,
    },
};
