import "@lib/i18next";

import { DeleteDialog } from "@pages/index/components/DeleteDialog";
import { act, render } from "@testing-library/react";
import i18next from "i18next";
import { expect, test } from "vitest";

test("DeleteDialog confirm button should work", () => {
  i18next.changeLanguage("en_US");

  let confirmed = false;

  const { getByText } = render(
    <DeleteDialog
      open={true}
      fileName="foo"
      onConfirmClick={() => (confirmed = true)}
      onCancelClick={() => {}}
    />
  );

  expect(confirmed).toBe(false);

  const confirmButton = getByText("Confirm");
  expect(confirmButton).toBeInTheDocument();

  act(() => {
    confirmButton.click();
  });

  expect(confirmed).toBe(true);
});

test("DeleteDialog cancel button should work", () => {
  i18next.changeLanguage("en_US");

  let cancelled = false;

  const { getByText } = render(
    <DeleteDialog
      open={true}
      fileName="foo"
      onConfirmClick={() => {}}
      onCancelClick={() => (cancelled = true)}
    />
  );

  expect(cancelled).toBe(false);

  const cancelButton = getByText("Cancel");
  expect(cancelButton).toBeInTheDocument();

  act(() => {
    cancelButton.click();
  });

  expect(cancelled).toBe(true);
});
