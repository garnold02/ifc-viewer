import { VisibilityToggle } from "@components/VisibilityToggle";
import { act, render } from "@testing-library/react";
import { expect, test } from "vitest";

test("VisibilityToggle should toggle visibility when enabled", () => {
  let setValue = false;

  const { getByRole } = render(
    <VisibilityToggle
      value={false}
      onChange={(value) => {
        setValue = value;
      }}
      disabled={false}
    />
  );

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  expect(setValue).toBe(true);
});

test("VisibilityToggle should not toggle visibility when disabled", () => {
  let setValue = false;

  const { getByRole } = render(
    <VisibilityToggle
      value={false}
      onChange={(value) => {
        setValue = value;
      }}
      disabled={true}
    />
  );

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  expect(setValue).toBe(false);
});
