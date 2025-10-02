import { useIfcStore } from "../../../stores/ifc/store";
import { ClipSettings } from "./ClipSettings";
import { FileInfo } from "./FileInfo";
import { Inspector } from "./inspector/Inspector";

export const ActionPanel = () => {
  const currentTool = useIfcStore((state) => state.tool.current);
  const selectedElement = useIfcStore((state) => state.selectedElement);

  switch (currentTool) {
    case null:
    case "select":
      if (selectedElement !== null) {
        return <Inspector element={selectedElement} />;
      } else {
        return <FileInfo />;
      }

    case "clip":
      return <ClipSettings />;
  }
};
