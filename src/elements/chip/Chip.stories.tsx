import React from "react";

import { Meta, Story } from "@storybook/react";

import Chip, { Props } from "./Chip";
export default {
  title: "Elements/Chip",
  component: Chip,
} as Meta;

const Template: Story<Props> = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: "nextjs",
  children: "default",
};
