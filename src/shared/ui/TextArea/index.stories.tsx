import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./index";

const meta: Meta<typeof TextArea> = {
  title: "UI/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    maxLength: { control: "number" },
    canShowAmount: { control: "boolean" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

const ControlledTextArea = (args: any) => {
  const [value, setValue] = useState("");
  return <TextArea {...args} value={value} onChangeValue={setValue} />;
};

export const Default: Story = {
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    maxLength: 200,
    canShowAmount: true,
    placeholder: "Введите текст...",
    disabled: false,
  },
};

export const WithoutCounter: Story = {
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    maxLength: 200,
    canShowAmount: false,
    placeholder: "Без счетчика символов",
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledTextArea {...args} />,
  args: {
    maxLength: 200,
    canShowAmount: true,
    disabled: true,
    placeholder: "Только для чтения",
  },
};
