import { Branding } from "@components/Branding";
import { router } from "@lib/reactRouter";
import { RouterContextProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("Branding component should link to the index page", () => {
  const { getByRole } = render(<Branding />, {
    wrapper: (props) => (
      <RouterContextProvider router={router}>
        {props.children}
      </RouterContextProvider>
    ),
  });

  screen.debug();

  expect(getByRole("link")).toBeInTheDocument();
  expect(getByRole("link")).toHaveAttribute("href", "/");
});
