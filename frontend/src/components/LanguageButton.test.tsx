import { LanguageButton } from "@components/LanguageButton";
import { act } from "@testing-library/react";
import { customRender } from "@utils/componentTesting";
import { expect, test } from "vitest";

test("LanguageButton should bring up the language menu when clicked", () => {
  const { getByRole, getAllByRole } = customRender(<LanguageButton />);

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  const menus = getAllByRole("menu");
  expect(menus.length).toBeGreaterThan(0);
});
