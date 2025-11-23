import "@lib/i18next";

import { ThemeToggle } from "@components/ThemeToggle";
import {
  createThemeStore,
  ThemeStoreContext,
  useThemeStore,
} from "@stores/theme/store";
import { act, render, renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

test("ThemeToggle should toggle the site theme", () => {
  const themeStore = createThemeStore("dark");

  const { getByRole } = render(<ThemeToggle />, {
    wrapper: (props) => (
      <ThemeStoreContext.Provider value={themeStore}>
        {props.children}
      </ThemeStoreContext.Provider>
    ),
  });

  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  const {
    result: { current: mode1 },
  } = renderHook(() => useThemeStore((state) => state.mode), {
    wrapper: (props) => (
      <ThemeStoreContext.Provider value={themeStore}>
        {props.children}
      </ThemeStoreContext.Provider>
    ),
  });

  act(() => {
    button.click();
  });

  const {
    result: { current: mode2 },
  } = renderHook(() => useThemeStore((state) => state.mode), {
    wrapper: (props) => (
      <ThemeStoreContext.Provider value={themeStore}>
        {props.children}
      </ThemeStoreContext.Provider>
    ),
  });

  act(() => {
    button.click();
  });

  const {
    result: { current: mode3 },
  } = renderHook(() => useThemeStore((state) => state.mode), {
    wrapper: (props) => (
      <ThemeStoreContext.Provider value={themeStore}>
        {props.children}
      </ThemeStoreContext.Provider>
    ),
  });

  expect(mode1).toBe("dark");
  expect(mode2).toBe("light");
  expect(mode3).toBe("dark");
});
