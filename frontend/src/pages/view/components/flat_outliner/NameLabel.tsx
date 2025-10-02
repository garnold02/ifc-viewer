import { Typography } from "@mui/material";
import type { IfcNodeFlat } from "../../../../types/ifc";

type Props = {
  element: IfcNodeFlat;
};

export const NameLabel = ({ element }: Props) => {
  if (element.name === null || element.name.length === 0) {
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
      {element.name}
    </Typography>
  );
};
