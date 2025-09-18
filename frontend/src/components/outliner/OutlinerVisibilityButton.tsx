import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Props = {
  value: boolean;
  onClick: () => void;
  disabled: boolean;
};

export const OutlinerVisibilityButton = ({
  value,
  onClick,
  disabled,
}: Props) => {
  return (
    <IconButton size="small" onClick={onClick} disabled={disabled}>
      {value ? <VisibilityIcon fontSize="small" /> : null}
      {!value ? <VisibilityOffIcon fontSize="small" /> : null}
    </IconButton>
  );
};
