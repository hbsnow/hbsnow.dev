/* eslint-env jest */
import React from "react";

import { render, screen } from "@testing-library/react";

import Container from "./Container";

describe("Container Component", () => {
  it("render the container", () => {
    render(<Container>container</Container>);
    const target = screen.getByTestId("Container");
    expect(target).toHaveTextContent("container");
  });
});
