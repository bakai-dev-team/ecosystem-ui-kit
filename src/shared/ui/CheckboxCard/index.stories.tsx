import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxCard } from "./index";

const meta: Meta<typeof CheckboxCard> = {
  title: "UI/CheckboxCard",
  component: CheckboxCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxCard>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "0 996 123 223", subtitle: "Серебро - 3000 С", checked: false },
      { id: "2", label: "0 777 456 789", subtitle: "Золото - 5000 С", checked: true },
      { id: "3", label: "0 555 987 654", subtitle: "Бронза - 1500 С", checked: false },
    ]);

    const handleChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div style={{ width: "500px", padding: "16px" }}>
        <CheckboxCard item={items} onChange={handleChange} />
      </div>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "0 996 123 223", subtitle: "Серебро - 3000 С", checked: false },
      { id: "2", label: "0 777 456 789", subtitle: "Золото - 5000 С", checked: true },
    ]);

    const handleChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div style={{ width: "500px", padding: "16px" }}>
        <CheckboxCard item={items} onChange={handleChange} />
      </div>
    );
  },
};
