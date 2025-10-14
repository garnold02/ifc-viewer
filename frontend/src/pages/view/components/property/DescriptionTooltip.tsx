import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tooltip } from "@mui/material";

type Props = {
  description: string | null;
};

export const DescriptionTooltip = ({ description }: Props) => {
  if (description === null) {
    return null;
  }

  return (
    <Tooltip title={description}>
      <HelpOutlineIcon
        fontSize="small"
        sx={{ color: "text.secondary", marginLeft: 1 }}
      />
    </Tooltip>
  );
};
