import { LanguageButton } from "@components/LanguageButton";
import { act } from "@testing-library/react";
import { customRender } from "@utils/componentTesting";
import { getI18n } from "react-i18next";
import { expect, test } from "vitest";

test("LanguageButton should switch between english and hungarian languages", () => {
  const { getAllByRole, getByText } = customRender(<LanguageButton />);

  const buttons = getAllByRole("button");
  expect(buttons.length).toBe(1);

  const languageButton = buttons[0];
  expect(languageButton).toBeInTheDocument();

  act(() => {
    languageButton.click();
  });

  const englishButton = getByText("English");
  expect(englishButton).toBeInTheDocument();

  act(() => {
    englishButton.click();
  });

  expect(getI18n().language).toBe("en_US");

  act(() => {
    languageButton.click();
  });

  const hungarianButton = getByText("Magyar");
  expect(hungarianButton).toBeInTheDocument();

  act(() => {
    hungarianButton.click();
  });

  expect(getI18n().language == "hu_HU");
});
