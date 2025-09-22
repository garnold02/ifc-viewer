import { Chip } from "@mui/material";
import type { TreeNode } from "../../api/queries/tree/types";

type Props = {
  node: TreeNode;
};

export const OutlinerNodeNameLabel = ({ node }: Props) => {
  if (node.name === null || node.name.length === 0) {
    return null;
  }

  return <Chip size="small" label={node.name} sx={{ marginLeft: 1 }} />;
};
