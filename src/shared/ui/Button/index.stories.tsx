import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";
import type { TBtnVariant, TBtnSize } from "./types";
import "./styles.scss"; 

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "monochrome", "solid"] satisfies TBtnVariant[],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"] satisfies TBtnSize[],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "md",
  },
};

export const Monochrome: Story = {
  args: {
    children: "Monochrome Button",
    variant: "monochrome",
    size: "md",
  },
};

export const Solid: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    variant: "primary",
  },
};
