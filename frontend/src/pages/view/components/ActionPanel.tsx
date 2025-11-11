import { ClipSettings } from "@pages/view/components/ClipSettings";
import { FileInfo } from "@pages/view/components/FileInfo";
import { BatchInspector } from "@pages/view/components/inspector/BatchInspector";
import { Inspector } from "@pages/view/components/inspector/Inspector";
import { useIfcStore } from "@stores/ifc/store";

export const ActionPanel = () => {
  const currentTool = useIfcStore((state) => state.tool.current);
  const selectedElementIds = useIfcStore((state) => state.selection.elementIds);

  switch (currentTool) {
    case null:
    case "select":
      if (selectedElementIds.length === 0) {
        return <FileInfo />;
      } else if (selectedElementIds.length === 1) {
        return <Inspector elementId={selectedElementIds[0]} />;
      } else {
        return <BatchInspector elementIds={selectedElementIds} />;
      }

    case "clip":
      return <ClipSettings />;
  }
};
