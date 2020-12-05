import React from "react";

import { Meta, Story } from "@storybook/react";

import Blockcode, { Props } from "./Blockcode";
export default {
  title: "Elements/Blockcode",
  component: Blockcode,
} as Meta;

const Template: Story<Props> = (args) => <Blockcode {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "const example = 0;",
  language: "js",
};
