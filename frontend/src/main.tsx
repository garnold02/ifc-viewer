import "./lib/i18next";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQuery";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./lib/reactRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./lib/mui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
