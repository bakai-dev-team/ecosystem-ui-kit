import { Meta, StoryFn } from "@storybook/react";
import { ChoiceCard, Option } from "./index";
import { ICON_TYPES } from "../../assets/icons/types";
import { IonApp, IonContent } from "@ionic/react";
import { IconProvider } from "../../assets/icons/IconProvider";

const options: Option[] = [
  { value: "self", label: "Оформить на себя", icon: ICON_TYPES.user },
  { value: "other", label: "Оформить на другого", icon: ICON_TYPES.user_tag },
  { value: "new", label: "Открыть новый ОСАГО", icon: ICON_TYPES.document },
];

export default {
  title: "UI/ChoiceCard",
  component: ChoiceCard,
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
} as Meta<typeof ChoiceCard>;

const Template: StoryFn<typeof ChoiceCard> = (args) => {

  const handleClick = (value: string) => {
    console.log(value);
    alert(`Вы выбрали: ${value}`);
  };

  return <ChoiceCard {...args} onClick={handleClick} />;
};

export const Default = Template.bind({});
Default.args = {
  options,
  icon_color: "rgba(0, 122, 255, 1)",
};

export const Dark = Template.bind({});
Dark.args = {
  options,
  icon_color: "rgba(10, 132, 255, 1)",
};
Dark.parameters = {
  backgrounds: { default: "dark" },
};
