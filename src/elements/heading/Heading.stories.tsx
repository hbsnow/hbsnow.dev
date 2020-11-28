import React from "react";

import { Meta, Story } from "@storybook/react";

import Heading, { Props } from "./Heading";
export default {
  title: "Elements/Heading",
  component: Heading,
} as Meta;

const Template: Story<Props> = (args) => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
  level: 1,
  children: "default",
};
