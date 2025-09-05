import type { Meta, StoryObj } from "@storybook/react";
import LoaderComponent from "./Loader";

const meta: Meta<typeof LoaderComponent> = {
  title: "Base/Loader",
  component: LoaderComponent,
};
export default meta;

type Story = StoryObj<typeof LoaderComponent>;

export const Loader: Story = {};
