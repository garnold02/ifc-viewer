import { SearchToggle } from "@pages/view/components/outliner/SearchToggle";
import { act, render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Outliner SearchToggle should be toggleable (false -> true)", () => {
  let value = false;

  const { getByRole } = render(
    <SearchToggle value={value} onChange={(newValue) => (value = newValue)} />
  );

  expect(value).toBe(false);

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  expect(value).toBe(true);
});

test("Outliner SearchToggle should be toggleable (true -> false)", () => {
  let value = true;

  const { getByRole } = render(
    <SearchToggle value={value} onChange={(newValue) => (value = newValue)} />
  );

  expect(value).toBe(true);

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  expect(value).toBe(false);
});
