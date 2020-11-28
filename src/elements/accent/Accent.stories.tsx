import React from "react";

import { Meta, Story } from "@storybook/react";

import Accent, { Props } from "./Accent";

export default {
  title: "Elements/Accent",
  component: Accent,
} as Meta;

const Template: Story<Props> = (args) => <Accent {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "default",
};
