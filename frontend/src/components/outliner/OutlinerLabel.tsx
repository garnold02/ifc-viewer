import { useCallback, useMemo } from "react";
import type { TreeNode } from "../../api/queries/tree/types";
import { Tooltip, Typography } from "@mui/material";
import { useOutlinerStore } from "./store";

type Props = {
  node: TreeNode;
};

export const OutlinerLabel = ({ node }: Props) => {
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const onTypographyClick = useCallback(() => {
    setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
  }, [node.id, selectedNodeId, setSelectedNodeId]);

  const typography = useMemo(
    () => (
      <Typography
        color={selectedNodeId === node.id ? "primary" : "textPrimary"}
        fontWeight={selectedNodeId === node.id ? "bold" : "normal"}
        sx={{ userSelect: "none" }}
        onClick={onTypographyClick}
        noWrap
      >
        {node.type}
      </Typography>
    ),
    [node.id, node.type, onTypographyClick, selectedNodeId]
  );

  if (node.name !== null && node.name.length > 0) {
    return <Tooltip title={node.name}>{typography}</Tooltip>;
  }

  return typography;
};
