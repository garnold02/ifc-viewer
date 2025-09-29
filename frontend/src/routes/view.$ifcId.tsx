import { createFileRoute } from "@tanstack/react-router";
import { parseIntCorrectly } from "../utils/parsing";
import { Page } from "../pages/view/Page";

export const Route = createFileRoute("/view/$ifcId")({
  loader: async ({ params }) => ({
    ifcId: parseIntCorrectly(params.ifcId),
  }),
  component: Page,
});
