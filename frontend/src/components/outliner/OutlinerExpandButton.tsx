import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {
  value: boolean;
  onClick: () => void;
  disabled: boolean;
};

export const OutlinerExpandButton = ({ value, onClick, disabled }: Props) => {
  return (
    <IconButton size="small" onClick={onClick} disabled={disabled}>
      {value ? <KeyboardArrowDownIcon fontSize="small" /> : null}
      {!value ? <KeyboardArrowRightIcon fontSize="small" /> : null}
    </IconButton>
  );
};
