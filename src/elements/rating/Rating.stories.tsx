import React from "react";

import { Meta, Story } from "@storybook/react";

import Rating, { Props } from "./Rating";
export default {
  title: "Elements/Rating",
  component: Rating,
} as Meta;

const Template: Story<Props> = (args) => <Rating {...args} />;

export const Default = Template.bind({});
Default.args = {
  rate: 2,
};
