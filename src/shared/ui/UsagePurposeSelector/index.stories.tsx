import  { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { UsagePurposeSelector, Option } from "./index";
import { IonApp, IonContent } from "@ionic/react";
import { IconProvider } from "@/shared/assets/icons/IconProvider";
const options: Option[] = [
  { value: "passengers", label: "Перевозка пассажиров" },
  { value: "personal", label: "Личное использование" },
  { value: "other", label: "Прочее" },
];

export default {
  title: "UI/UsagePurposeSelector",
  component: UsagePurposeSelector,
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1c1e24" },
      ],
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
} as Meta;

interface StoryProps {
  selected: string;
}

const Template: StoryFn<StoryProps> = (args) => {
  const [selected, setSelected] = useState(args.selected ?? options[0]?.value ?? "");

  return (
    <UsagePurposeSelector
      options={options}
      selected={selected}
      onSelect={setSelected}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  selected: options[0]?.value,
};

export const Dark = Template.bind({});
Dark.args = {
  selected: options[0]?.value,
};
Dark.parameters = {
  backgrounds: { default: "dark" },
};
