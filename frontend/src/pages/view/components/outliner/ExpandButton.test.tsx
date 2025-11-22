import { ExpandButton } from "@pages/view/components/outliner/ExpandButton";
import { act, render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Outliner ExpandButton should be toggleable (false -> true)", () => {
  let value = false;

  const { getByRole } = render(
    <ExpandButton
      value={value}
      onChange={(newValue) => (value = newValue)}
      visible={true}
    />
  );

  expect(value).toBe(false);

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  expect(value).toBe(true);
});

test("Outliner ExpandButton should be toggleable (true -> false)", () => {
  let value = true;

  const { getByRole } = render(
    <ExpandButton
      value={value}
      onChange={(newValue) => (value = newValue)}
      visible={true}
    />
  );

  expect(value).toBe(true);

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  expect(value).toBe(false);
});
