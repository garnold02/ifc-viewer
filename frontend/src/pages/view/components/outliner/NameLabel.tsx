import type { Element } from "@api/types/file/element";
import { Typography } from "@mui/material";

type Props = {
  element: Element;
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
