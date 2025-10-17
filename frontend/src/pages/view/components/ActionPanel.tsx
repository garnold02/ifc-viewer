import { ClipSettings } from "@pages/view/components/ClipSettings";
import { FileInfo } from "@pages/view/components/FileInfo";
import { Inspector } from "@pages/view/components/inspector/Inspector";
import { useIfcStore } from "@stores/ifc/store";

export const ActionPanel = () => {
  const currentTool = useIfcStore((state) => state.tool.current);
  const selectedElement = useIfcStore((state) => state.selectedElement);

  switch (currentTool) {
    case null:
    case "select":
      if (selectedElement !== null) {
        return <Inspector elementId={selectedElement.id} />;
      } else {
        return <FileInfo />;
      }

    case "clip":
      return <ClipSettings />;
  }
};
