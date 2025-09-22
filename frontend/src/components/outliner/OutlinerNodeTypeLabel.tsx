import { useCallback } from "react";
import type { TreeNode } from "../../api/queries/tree/types";
import { Typography } from "@mui/material";
import { useOutlinerStore } from "./store";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <Typography
      color={selectedNodeId === node.id ? "primary" : "textPrimary"}
      fontWeight={selectedNodeId === node.id ? "bold" : "normal"}
      sx={{ userSelect: "none" }}
      onClick={onTypographyClick}
      noWrap
    >
      {t(`ifc.type.${node.type}`, {
        defaultValue: node.type,
      })}
    </Typography>
  );
};
