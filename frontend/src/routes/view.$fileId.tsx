import { Page } from "@pages/view/Page";
import { createFileRoute } from "@tanstack/react-router";
import { parseIntCorrectly } from "@utils/parsing";

export const Route = createFileRoute("/view/$fileId")({
  loader: async ({ params }) => ({
    fileId: parseIntCorrectly(params.fileId),
  }),
  component: Page,
});
