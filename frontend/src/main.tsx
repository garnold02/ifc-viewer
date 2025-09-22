import "./lib/i18next";
import { queryClient } from "./lib/reactQuery";
import { router } from "./lib/reactRouter";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
