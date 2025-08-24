import type { Meta, StoryObj } from "@storybook/react";
import ButtonComponent from "./Button";

const meta: Meta<typeof ButtonComponent> = {
  title: "Base/Button",
  component: ButtonComponent,
};
export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const Button: Story = {
  render: () => (
    <div className="flex gap-4">
      <ButtonComponent variant="primary" size="md">
        Update
      </ButtonComponent>
      <ButtonComponent variant="primary" size="sm">
        Cancel
      </ButtonComponent>
      <ButtonComponent variant="default" size="md">
        Cancel
      </ButtonComponent>
      <ButtonComponent variant="default" size="sm">
        Cancel
      </ButtonComponent>
      <ButtonComponent variant="outline" size="sm">
        Test
      </ButtonComponent>
    </div>
  ),
};
