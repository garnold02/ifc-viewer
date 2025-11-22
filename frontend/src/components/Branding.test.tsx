import { Branding } from "@components/Branding";
import { renderWithRouter } from "@utils/componentTesting";
import { expect, test } from "vitest";

test("Branding component should link to the index page", () => {
  const { getByRole } = renderWithRouter(<Branding />);
  expect(getByRole("link")).toBeInTheDocument();
  expect(getByRole("link")).toHaveAttribute("href", "/");
});
