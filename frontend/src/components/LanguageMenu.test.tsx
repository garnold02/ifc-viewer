import { LanguageMenu } from "@components/LanguageMenu";
import { customRender } from "@utils/componentTesting";
import { act } from "react";
import { getI18n } from "react-i18next";
import { expect, test } from "vitest";

test("LanguageMenu should set the current language", () => {
  const { getByText } = customRender(
    <LanguageMenu anchorEl={null} onClose={() => {}} open />
  );

  const englishButton = getByText("English");
  const hungarianButton = getByText("Magyar");

  expect(englishButton).toBeInTheDocument();
  expect(hungarianButton).toBeInTheDocument();

  act(() => {
    englishButton.click();
  });

  expect(getI18n().language).toBe("en_US");

  act(() => {
    hungarianButton.click();
  });

  expect(getI18n().language).toBe("hu_HU");
});
