import { createFileRoute } from "@tanstack/react-router";
import { parseIntCorrectly } from "../utils/parsing";
import { IfcView } from "../pages/IfcView";

export const Route = createFileRoute("/view/$ifcId")({
  loader: async ({ params }) => ({
    ifcId: parseIntCorrectly(params.ifcId),
  }),
  component: IfcView,
});
