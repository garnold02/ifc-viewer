import {
  createThemeStore,
  ThemeStoreContext,
  useThemeStore,
} from "@stores/theme/store";
import { act, renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

test("ThemeStore theme switching logic should work", () => {
  const store = createThemeStore();

  const {
    result: { current: mode1 },
  } = renderHook(() => useThemeStore((state) => state.mode), {
    wrapper: (props) => (
      <ThemeStoreContext.Provider value={store}>
        {props.children}
      </ThemeStoreContext.Provider>
    ),
  });

  const {
    result: { current: setMode },
  } = renderHook(() => useThemeStore((state) => state.setMode), {
    wrapper: (props) => (
      <ThemeStoreContext.Provider value={store}>
        {props.children}
      </ThemeStoreContext.Provider>
    ),
  });

  expect(mode1).toBe("dark");

  act(() => {
    setMode("light");
  });

  const {
    result: { current: mode2 },
  } = renderHook(() => useThemeStore((state) => state.mode), {
    wrapper: (props) => (
      <ThemeStoreContext.Provider value={store}>
        {props.children}
      </ThemeStoreContext.Provider>
    ),
  });

  expect(mode2).toBe("light");

  act(() => {
    setMode("dark");
  });

  const {
    result: { current: mode3 },
  } = renderHook(() => useThemeStore((state) => state.mode), {
    wrapper: (props) => (
      <ThemeStoreContext.Provider value={store}>
        {props.children}
      </ThemeStoreContext.Provider>
    ),
  });

  expect(mode3).toBe("dark");
});
