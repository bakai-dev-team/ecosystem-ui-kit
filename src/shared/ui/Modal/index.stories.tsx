import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { IonButton, IonApp } from "@ionic/react";
import { Modal } from "./index";
import { IconProvider } from "../../assets/icons/IconProvider";
import { PurposeSelector } from "../PurposeSelector";
import { ICON_TYPES } from "../../assets/icons/types";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("zhainak");

  const options = [
    { label: "Перевозка пассажиров", value: "zhainak" },
    { label: "Личное использование", value: "baizak" },
    { label: "Прочее", value: "prochee" },
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
    alert(`Вы выбрали: ${value}`);
  };

  return (
    <IonApp>
      <IconProvider />
      <IonButton onClick={() => setIsOpen(true)}>Открыть модалку</IonButton>

      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        label="Цель использования ТС"
      >
        <PurposeSelector
          onSelect={handleSelect}
          selected={selected}
          options={options}
        />
      </Modal>
    </IonApp>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    text: "Выберите цель использования транспортного средства.",
    initialBreakpoint: 0.5,
  },
};

export const WithAction: Story = {
  render: Template,
  args: {
    text: "Можно добавить действие, например календарь или кнопку.",
    actionIcon: ICON_TYPES.calendar,
    actionText: "Открыть календарь",
    onActionClick: () => alert("Клик по действию!"),
  },
};
