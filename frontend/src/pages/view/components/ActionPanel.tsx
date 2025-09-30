import { useToolStore } from "../../../stores/tool/store";
import { ClipSettings } from "./ClipSettings";
import { Inspector } from "./inspector/Inspector";

export const ActionPanel = () => {
  const currentTool = useToolStore((state) => state.current);
  switch (currentTool) {
    case null:
    case "select":
      return <Inspector />;

    case "clip":
      return <ClipSettings />;
  }
};
