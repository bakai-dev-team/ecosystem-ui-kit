import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider } from "./index";
import "./styles.scss"
import { IonApp, IonContent } from "@ionic/react";
import { Toast } from "@/shared/libs/utils/Toast";
import { IconProvider } from "@/shared/assets/icons/IconProvider";

const meta: Meta<typeof ToastProvider> = {
  title: "UI/Toast",
  component: ToastProvider,
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="toast-stories-buttons">
        <button className="toast-stories-buttons__success" onClick={() => Toast.success("success_msg")}>Success</button>
        <button className="toast-stories-buttons__error" onClick={() => Toast.error("error_msg", "subtitle_msg")}>
          Error
        </button>
        <button className="toast-stories-buttons__warning" onClick={() => Toast.warning("warning_msg")}>Warning</button>
        <button className="toast-stories-buttons__info" onClick={() => Toast.info("info_msg", "subtitle_msg")}>
          Info
        </button>
      </div>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Демонстрация тостов с разными типами: success, error, warning, info",
      },
    },
  },
   decorators: [
      (Story) => (
        <IonApp>
          <IconProvider />
          <IonContent>
            <Story />
          </IonContent>
        </IonApp>
      ),
    ],
};
