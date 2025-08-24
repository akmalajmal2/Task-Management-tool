import type { Meta, StoryObj } from "@storybook/react";
import DropDownButtonComponent from "./DropDownButton";

const meta: Meta<typeof DropDownButtonComponent> = {
  title: "Base/DropDownButton",
  component: DropDownButtonComponent,
};
export default meta;

type Story = StoryObj<typeof DropDownButtonComponent>;

export const DropDownButton: Story = {
  args: { label: "Due Date" },
};
