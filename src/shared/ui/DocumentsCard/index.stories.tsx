import type { Meta, StoryObj } from "@storybook/react";
import { DocumentsCard } from "./index";

const meta: Meta<typeof DocumentsCard> = {
  title: "UI/DocumentsCard",
  component: DocumentsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  
  },
  argTypes: {
    data: {
      control: "object",
      description: "Массив с данными документа (label, value)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DocumentsCard>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "400px", }}>
      <DocumentsCard {...args} />
    </div>
  ),
  args: {
    data: [
      { label: "ID паспорта", value: "AN1234567" },
      { label: "Водительское удостоверение", value: "99 01 123456" },
      { label: "Техпаспорт", value: "01KG123ABC" },
    ],
  },
};

export const DarkMode: Story = {
   render: (args) => (
    <div style={{ width: "400px", }}>
      <DocumentsCard {...args} />
    </div>
  ),
  args: {
    data: [
      { label: "ID паспорта", value: "BN7654321" },
      { label: "Водительское удостоверение", value: "99 02 654321" },
      { label: "Техпаспорт", value: "02KG654XYZ" },
    ],
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
