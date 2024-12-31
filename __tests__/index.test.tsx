/**
 * @jest-environment jsdom
 */
import Index from "@/app/page";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

describe("Home", () => {
  it("renders a heading", async () => {
    render(await (Index()));
    const notesOutput = screen.getByTestId("drizzle-test-result");
    expect(notesOutput.innerHTML).toContain("Today I created a Supabase project.");
  });
});
