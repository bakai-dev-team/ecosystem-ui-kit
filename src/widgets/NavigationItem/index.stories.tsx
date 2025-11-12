import type { Meta, StoryObj } from "@storybook/react";
import { NavigationItem } from "./index";
import { IonApp, IonContent } from "@ionic/react";
import { IconProvider } from "@/shared/assets/icons/IconProvider";
const ICONS = [
  "arrowLeft",
  "menu",
  "home",
  "user",
  "settings",
  "arrowRight",
];

const meta: Meta<typeof NavigationItem> = {
  title: "UI/NavigationItem",
  component: NavigationItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
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
  argTypes: {
    icon: {
      control: "select",
      options: ICONS,
      description: "Левая иконка (тип для компонента Icon)",
    },
    title: {
      control: "text",
      description: "Заголовок навигации",
    },
    rightIcon: {
      control: "select",
      options: ICONS,
      description: "Правая иконка (тип для компонента Icon)",
    },
    bakai_logo: {
      control: "boolean",
      description: "Показать логотип Bakai",
    },
    onBack: {
      action: "back clicked",
      description: "Событие при клике на левую иконку",
    },
    onClick: {
      action: "right icon clicked",
      description: "Событие при клике на правую иконку",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const Default: Story = {
  render: (args) => (
    <IonApp>
      <IonContent className="ion-padding" style={{ background: "var(--bg)" }}>
        <NavigationItem {...args} />
      </IonContent>
    </IonApp>
  ),
  args: {
    icon: "arrowLeft",
    title: "Главная страница",
    rightIcon: "calendar",
    bakai_logo: false,
  },
};

export const WithBakaiLogo: Story = {
  render: (args) => (
    <IonApp>
      <IonContent className="ion-padding" style={{ background: "var(--bg)" }}>
        <NavigationItem {...args} />
      </IonContent>
    </IonApp>
  ),
  args: {
    icon: "arrowLeft",
    rightIcon: "info",
    bakai_logo: true,
  },
};
