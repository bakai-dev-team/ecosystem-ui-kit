import type { Meta, StoryObj } from "@storybook/react";
import AmountLimit from "./index";
import { IonApp, IonContent } from "@ionic/react";

const meta: Meta<typeof AmountLimit> = {
    title: "UI/AmountLimit",
    component: AmountLimit,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: {
            control: "text",
            description: "Текст метки, например 'Доступный лимит'",
        },
        amount: {
            control: "number",
            description: "Сумма для отображения",
        },
    },
};

export default meta;
type Story = StoryObj<typeof AmountLimit>;

export const Default: Story = {
    render: (args) => (
        <IonApp>
            <IonContent
                className="ion-padding"
                style={{
                    background: "var(--bg)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <div style={{ width: "280px" }}>
                    <AmountLimit {...args} />
                </div>
            </IonContent>
        </IonApp>
    ),
    args: {
        label: "Доступный лимит",
        amount: 250000,
    },
};

export const DarkTheme: Story = {
    render: (args) => (
        <IonApp>
            <IonContent
                className="ion-padding dark"
                style={{
                    background: "var(--bg)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <div style={{ width: "280px" }}>
                    <AmountLimit {...args} />
                </div>
            </IonContent>
        </IonApp>
    ),
    args: {
        label: "Кредиттик лимит",
        amount: 78000,
    },
};
