import { Typography } from "@mui/material";
import type { IfcNode } from "../../../../types/ifc";

type Props = {
  node: IfcNode;
};

export const NameLabel = ({ node }: Props) => {
  if (node.name === null || node.name.length === 0) {
    return null;
  }

  return (
    <Typography
      variant="caption"
      color="textSecondary"
      marginLeft={1}
      sx={{ userSelect: "none" }}
      noWrap
    >
      {node.name}
    </Typography>
  );
};
