import { LanguageButton } from "@components/LanguageButton";
import { act } from "@testing-library/react";
import { renderWithRouter } from "@utils/componentTesting";
import { expect, test } from "vitest";

test("LanguageButton should bring up the language menu when clicked", () => {
  const { getByRole, getAllByRole } = renderWithRouter(<LanguageButton />);

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  const menus = getAllByRole("menu");
  expect(menus.length).toBeGreaterThan(0);
});
