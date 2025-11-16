import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { TermCard } from "./index";

export default {
  title: "UI/TermCard",
  component: TermCard,
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1c1e24" },
      ],
    },
  },
} as Meta<typeof TermCard>;

const sampleData = [
  { label: "3 месяца", value: 3 },
  { label: "6 месяцев", value: 6 },
  { label: "9 месяцев", value: 9 },
  { label: "12 месяцев", value: 12 },
];

const Template: StoryFn<any> = (args) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <TermCard
      {...args}
      selectedValue={selected}
      onSelect={(val) => {
        setSelected(val as number);
        alert(`Выбрано: ${val} месяцев`);
      }}
    />
  );
};

export const Default: typeof Template = Template.bind({});
Default.args = {
  text: "Срок страхования",
  data: sampleData,
};

export const Dark = Template.bind({});
Dark.args = {
  text: "Срок страхования",
  data: sampleData,
};
Dark.parameters = {
  backgrounds: { default: "dark" },
};
