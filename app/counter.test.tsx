import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./counter";
import { it, expect, describe } from 'vitest';

describe("Counter", () => {
  it("App Router: Works with Client Components (React State)", () => {
    render(<Counter />);
    expect(screen.getByRole("heading")).toHaveTextContent("0");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("heading")).toHaveTextContent("1");
  });
});
