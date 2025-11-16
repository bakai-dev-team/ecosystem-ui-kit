import type { Meta, StoryObj } from "@storybook/react"
import { PaymentAction } from "./index"
import { IonApp, IonContent } from "@ionic/react"
import { IconProvider } from "../../shared/assets/icons/IconProvider"

const meta: Meta<typeof PaymentAction> = {
  title: "UI/PaymentAction",
  component: PaymentAction,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <IonApp>
        <IconProvider/>
          <IonContent
            className="ion-padding"
            style={{
              background: "var(--bg)",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Story />
          </IonContent>
      </IonApp>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["autopayment", "templates", "retry"],
      description: "Тип действия платежа",
    },
    onPaymentActionClick: {
      action: "clicked",
      description: "Событие при клике на компонент",
    },
  },
}

export default meta
type Story = StoryObj<typeof PaymentAction>

export const Default: Story = {
  args: {
    type: "autopayment",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <PaymentAction
        type="autopayment"
        onPaymentActionClick={() => console.log("Автоплатёж")}
      />
      <PaymentAction
        type="templates"
        onPaymentActionClick={() => console.log("Шаблоны")}
      />
      <PaymentAction
        type="retry"
        onPaymentActionClick={() => console.log("Повторить")}
      />
    </div>
  ),
}
