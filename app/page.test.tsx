/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";

it("App Router: Works with Server Components", async () => {
  render(await Page());
  const heading = screen.getByRole("heading", {
    name: /next steps/i,
  });
  expect(heading).toBeInTheDocument();
});


it("Tests that instruments are pulled from the db with Drizzle", async () => {
  render(await Page());
  const instrumentsFromDrizzle = screen.getByTestId("drizzle-test-result");
  expect(instrumentsFromDrizzle).toBeInTheDocument();
});

