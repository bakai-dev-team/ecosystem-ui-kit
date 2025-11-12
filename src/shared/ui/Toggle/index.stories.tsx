import  { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./index";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "Текст, отображаемый рядом с переключателем",
    },
    checked: {
      control: "boolean",
      description: "Состояние переключателя (вкл/выкл)",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Размер переключателя",
      defaultValue: "md",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);

    return (
      <Toggle
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.detail.checked)}
      />
    );
  },
  args: {
    text: "Включить уведомления",
    checked: false,
    size: "md",
  },
};
