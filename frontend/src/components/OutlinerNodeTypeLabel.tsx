import { useCallback } from "react";
import { Typography } from "@mui/material";
import { useOutlinerStore } from "../stores/outlinerStore";
import type { IfcNode } from "../types/ifc";

type Props = {
  node: IfcNode;
};

export const OutlinerNodeTypeLabel = ({ node }: Props) => {
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
