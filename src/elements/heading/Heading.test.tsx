/**
 * @jest-environment jsdom
 */
import React from "react";

import { render, screen } from "@testing-library/react";

import Heading from "./Heading";

describe("Heading Component", () => {
  it("render the container", () => {
    render(<Heading>heading</Heading>);
    const target = screen.getByRole("heading");
    expect(target).toHaveTextContent("heading");
  });
});
