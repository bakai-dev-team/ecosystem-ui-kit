import type { Meta, StoryObj } from "@storybook/react";
import { CardSelect, type IAccountCard } from "./index";
import { IonApp } from "@ionic/react";

const meta: Meta<typeof CardSelect> = {
  title: "UI/CardSelect",
  component: CardSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    accounts: { control: "object", description: "Массив счетов" },
    selectedId: { control: "text", description: "ID выбранного счета" },
    onSelect: { action: "onSelect", description: "Вызывается при выборе счета" },
    hideBalance: { control: "boolean", description: "Скрыть баланс" },
    isLoading: { control: "boolean", description: "Показать скелетон" },
  },
};

export default meta;
type Story = StoryObj<typeof CardSelect>;

const mockAccounts: IAccountCard[] = [
  {
    name: "Bakai Bank Visa",
    imageName: "visa",
    accountNo: "123456789",
    cardPan: "123456******9876",
    balance: 15234.75,
    currencyID: 417,
  },
  {
    name: "Ислам Карта Элкарт",
    imageName: "DEPOSITE",
    accountNo: "987654321",
    cardPan: "543212******1234",
    balance: 4200,
    currencyID: 417,
  },
  {
    name: "Мой текущий счёт",
    imageName: "default",
    accountNo: "24681012",
    cardPan: "246810******1357",
    balance: 9500.5,
    currencyID: 417,
  },
];

export const Default: Story = {
  args: {
    accounts: mockAccounts,
    selectedId: "123456789",
    hideBalance: false,
    isLoading: false,
  },
  render: (args) => (
    <IonApp>
      <div style={{ width: "500px", maxWidth: "100%" }}>
        <CardSelect {...args} />
      </div>
    </IonApp>
  ),
};

export const HideBalance: Story = {
  args: {
    accounts: mockAccounts,
    selectedId: null,
    hideBalance: true,
  },
  render: (args) => (
    <IonApp>
      <div style={{ width: "500px", maxWidth: "100%" }}>
        <CardSelect {...args} />
      </div>
    </IonApp>
  ),
};

export const Loading: Story = {
  args: {
    accounts: [],
    selectedId: null,
    isLoading: true,
  },
  render: (args) => (
    <IonApp>
      <div style={{ width: "500px", maxWidth: "100%" }}>
        <CardSelect {...args} />
      </div>
    </IonApp>
  ),
};

export const EmptyList: Story = {
  args: {
    accounts: [],
    selectedId: null,
    isLoading: false,
  },
  render: (args) => (
    <IonApp>
      <div style={{ width: "500px", maxWidth: "100%" }}>
        <CardSelect {...args} />
      </div>
    </IonApp>
  ),
};