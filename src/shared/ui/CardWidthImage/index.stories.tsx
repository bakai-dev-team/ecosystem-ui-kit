import type { Meta, StoryObj } from "@storybook/react";
import { CardWithImage } from "./index";
// @ts-ignore: Ignore missing type declaration for image import
import Car from "../../assets/images/car.webp";
import { ItemProps } from "./index";
import { IonApp, IonContent } from "@ionic/react";
import { IconProvider } from "../../assets/icons/IconProvider";

const meta: Meta<typeof CardWithImage> = {
  title: "UI/CardWithImage",
  component: CardWithImage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
      (Story) => (
        <IonApp>
          <IconProvider />
          <IonContent style={{width:"400px"}}>
            <Story />
          </IonContent>
        </IonApp>
      ),
    ],
};
export default meta;

type Story = StoryObj<typeof CardWithImage>;

const items: ItemProps[] = [
  {
    icon: "info",
    title: "Осаго",
    description: "Страхование, которое покрывает ущерб ДТП",
    image: Car,
  },
  {
    icon: "car",
    title: "Заграничный полис",
    description: "Полис, покрывающий расходы в чрезвычайных ситуациях за границей",
    image: Car,
  },
];

const handleGoToProduct = () => {
  alert("Переход к продукту!");
};

export const Default: Story = {
  render: (args) => <CardWithImage {...args} />,
  args: {
    item: items,
    goToProduct: handleGoToProduct,
  },
};

export const SingleCard: Story = {
  render: (args) => <CardWithImage {...args} />,
  args: {
    item: items,
    goToProduct: handleGoToProduct,
  },
};

export const Empty: Story = {
  render: (args) => <CardWithImage {...args} />,
  args: {
    item: [],
    goToProduct: handleGoToProduct,
  },
};
