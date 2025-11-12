import "@lib/i18next";

import { theme } from "@lib/mui";
import { router } from "@lib/reactRouter";
import { ThemeProvider } from "@mui/material";
import { RouterContextProvider } from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

export const customRender = (node: ReactNode) => {
  return render(node, {
    wrapper: (props) => (
      <ThemeProvider theme={theme}>
        <RouterContextProvider router={router}>
          {props.children}
        </RouterContextProvider>
      </ThemeProvider>
    ),
  });
};
