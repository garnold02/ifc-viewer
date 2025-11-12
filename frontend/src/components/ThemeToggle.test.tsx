import { ThemeToggle } from "@components/ThemeToggle";
import { theme } from "@lib/mui";
import { ThemeProvider, useColorScheme } from "@mui/material";
import { act, renderHook } from "@testing-library/react";
import { customRender } from "@utils/componentTesting";
import { expect, test } from "vitest";

test("ThemeToggle should toggle the site theme", () => {
  const {
    result: {
      current: { mode: before },
    },
  } = renderHook(() => useColorScheme(), {
    wrapper: (props) => (
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    ),
  });

  const { getByRole } = customRender(<ThemeToggle />);
  const button = getByRole("button");
  expect(button).toBeInTheDocument();

  act(() => {
    button.click();
  });

  const {
    result: {
      current: { mode: after },
    },
  } = renderHook(() => useColorScheme(), {
    wrapper: (props) => (
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    ),
  });

  const switch1 = before === "light" && after === "dark";
  const switch2 = before === "dark" && after === "light";
  const valid = switch1 || switch2;

  expect(valid).toBe(true);
});
