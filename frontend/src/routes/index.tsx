import { createFileRoute } from "@tanstack/react-router";
import { Page } from "../pages/index/Page";

export const Route = createFileRoute("/")({
  component: Page,
});
