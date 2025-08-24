import type { Meta, StoryObj } from "@storybook/react";
import ToolTipOptionsComp from "./TooltipOptions";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

const meta: Meta<typeof ToolTipOptionsComp> = {
  title: "Base/ToolTipOptions",
  component: ToolTipOptionsComp,
};
export default meta;

type Story = StoryObj<typeof ToolTipOptionsComp>;

export const ToolTipOptions: Story = {
  args: {
    items: [
      { id: 1, label: "work", icon: BiSolidEditAlt },
      { id: 2, label: "personal", icon: RiDeleteBin5Fill },
    ],
  },
};
