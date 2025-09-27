import { createFileRoute } from "@tanstack/react-router";
import { IfcList } from "../pages/IfcList";

export const Route = createFileRoute("/")({
  component: IfcList,
});
