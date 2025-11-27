import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input,type ITextFieldTypes } from "./index";
import {  ICON_TYPES } from "../../assets/icons/types"
import { IonApp, IonContent } from "@ionic/react";
import { IconProvider } from "../../assets/icons/IconProvider";
const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
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
    type: {
      control: "select",
      options: ["date", "email", "number", "password", "search", "tel", "text", "url", "time", "week", "month", "datetime-local"] as ITextFieldTypes[],
    },
    preIcon: { control: false },
    postIcon: { control: false },
    clearInput: { control: "boolean" },
    placeholder: { control: "text" },
    error: { control: "text" },
    label: { control: "text" },
    labelPlacement: {
      control: "select",
      options: ["fixed", "start", "end", "floating", "stacked", undefined],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;


export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: "Введите текст",
  },
};


export const WithIcons: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        value={value}
        onChange={setValue}
        postIcon={ICON_TYPES.info}
        onPostIconClick={() => alert("Post icon clicked")}
      />
    );
  },
  args: {
    placeholder: "Поиск...",
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        value={value}
        onChange={setValue}
        error="Неверный формат"
      />
    );
  },
  args: {
    placeholder: "Введите email",
  },
};


export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Input {...args} value={value} onChange={setValue} clearInput />;
  },
  args: {
    placeholder: "Можно очистить",
  },
};


export const WithLabelStart: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: "Введите текст",
    label: "Введите текст",
    labelPlacement: "floating",
  },
};

export const WithLabelStacked: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: "Введите текст",
    label: "Стек лейбл",
    labelPlacement: "stacked",
  },
};