import { useCallback } from "react";
import { Typography } from "@mui/material";
import type { IfcNode } from "../../../../types/ifc";
import { useOutlinerStore } from "../../../../stores/outliner/store";

type Props = {
  node: IfcNode;
};

export const TypeLabel = ({ node }: Props) => {
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const onTypographyClick = useCallback(() => {
    setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
  }, [node.id, selectedNodeId, setSelectedNodeId]);

  return (
    <Typography
      color={selectedNodeId === node.id ? "primary" : "textPrimary"}
      fontWeight={selectedNodeId === node.id ? "bold" : "normal"}
      sx={{ userSelect: "none" }}
      onClick={onTypographyClick}
      noWrap
    >
      {node.type}
    </Typography>
  );
};
