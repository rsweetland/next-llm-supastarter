import Index from "@/app/page";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';

describe("Home", () => {
  it("renders a heading", async () => {
    render(await (Index()));
    const instrumentsOutput = screen.getByTestId("drizzle-test-result");
    expect(instrumentsOutput.innerHTML).toContain("violin");
  });
});
