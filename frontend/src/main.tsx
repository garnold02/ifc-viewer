import "@lib/i18next";

import { ToggleableThemeProvider } from "@components/ToggleableThemeProvider";
import { queryClient } from "@lib/reactQuery";
import { router } from "@lib/reactRouter";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToggleableThemeProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </ToggleableThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
