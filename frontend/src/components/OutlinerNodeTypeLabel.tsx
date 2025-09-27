import { useCallback } from "react";
import { Typography } from "@mui/material";
import type { TreeNode } from "../api/queries/ifcTree";
import { useOutlinerStore } from "../stores/outlinerStore";

type Props = {
  node: TreeNode;
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
