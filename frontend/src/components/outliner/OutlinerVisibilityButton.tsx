import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMemo } from "react";

type Props = {
  value: boolean;
  onClick: () => void;
};

export const OutlinerVisibilityButton = ({ value, onClick }: Props) => {
  const icon = useMemo(
    () =>
      value ? (
        <VisibilityIcon fontSize="small" />
      ) : (
        <VisibilityOffIcon fontSize="small" />
      ),
    [value]
  );

  return (
    <IconButton size="small" onClick={onClick}>
      {icon}
    </IconButton>
  );
};
