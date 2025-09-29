import { Chip } from "@mui/material";
import type { IfcNode } from "../../../types/ifc";

type Props = {
  node: IfcNode;
};

export const OutlinerNodeNameLabel = ({ node }: Props) => {
  if (node.name === null || node.name.length === 0) {
    return null;
  }

  return <Chip size="small" label={node.name} sx={{ marginLeft: 1 }} />;
};
