import React from "react";

import { Meta, Story } from "@storybook/react";

import Blockquote, { Props } from "./Blockquote";
export default {
  title: "Elements/Blockquote",
  component: Blockquote,
} as Meta;

const Template: Story<Props> = (args) => <Blockquote {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "const example = 0;",
};
