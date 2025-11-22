import "@lib/i18next";

import { router } from "@lib/reactRouter";
import { RouterContextProvider } from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

export const customRender = (node: ReactNode) => {
  return render(node, {
    wrapper: (props) => (
      <RouterContextProvider router={router}>
        {props.children}
      </RouterContextProvider>
    ),
  });
};
