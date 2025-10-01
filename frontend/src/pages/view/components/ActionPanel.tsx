import { useOutlinerStore } from "../../../stores/outliner/store";
import { useToolStore } from "../../../stores/tool/store";
import { ClipSettings } from "./ClipSettings";
import { FileInfo } from "./FileInfo";
import { Inspector } from "./inspector/Inspector";

export const ActionPanel = () => {
  const currentTool = useToolStore((state) => state.current);
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);

  switch (currentTool) {
    case null:
    case "select":
      if (selectedNodeId !== null) {
        return <Inspector nodeId={selectedNodeId} />;
      } else {
        return <FileInfo />;
      }

    case "clip":
      return <ClipSettings />;
  }
};
