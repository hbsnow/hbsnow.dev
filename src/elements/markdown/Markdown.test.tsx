/* eslint-env jest */
import React from "react";

import { render, screen } from "@testing-library/react";

import Markdown from "./Markdown";

describe("Markdown Component", () => {
  it("render the markdown", () => {
    render(<Markdown source="markdown" />);
    const target = screen.getByTestId("Markdown");
    expect(target).toHaveTextContent("markdown");
  });
});
