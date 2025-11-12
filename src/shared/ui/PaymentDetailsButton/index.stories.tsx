import type { Meta, StoryObj } from "@storybook/react";
import { PaymentDetailsButton } from "./index";
import { IonApp } from "@ionic/react";
import { IconProvider } from "@/shared/assets/icons/IconProvider";

const meta: Meta<typeof PaymentDetailsButton> = {
  title: "UI/PaymentDetailsButton",
  component: PaymentDetailsButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F7F8FA" },
        { name: "dark", value: "#1C1E24" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <IonApp>
        <IconProvider />
        <div className="ion-padding" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width:"200px"  }}>
          <Story />
        </div>
      </IonApp>
    ),
  ],
  argTypes: {
    label: { control: "text", description: "Текст на кнопке" },
    onClick: { action: "clicked", description: "Событие при клике на кнопку" },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentDetailsButton>;


export const Default: Story = {
  args: {
    label: "Детали операции ",
  },
};

export const Clickable: Story = {
  args: {
    label: "Нажми меня",
    onClick: () => alert("Кнопка нажата!"),
  },
};
