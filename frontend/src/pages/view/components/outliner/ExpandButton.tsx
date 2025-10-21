import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IconButton } from "@mui/material";
import { useCallback } from "react";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  visible: boolean;
};

export const ExpandButton = ({ value, onChange, visible }: Props) => {
  const onClick = useCallback(() => onChange(!value), [onChange, value]);
  return (
    <IconButton
      size="small"
      onClick={onClick}
      sx={{ visibility: visible ? "visible" : "hidden" }}
    >
      {value ? (
        <KeyboardArrowDownIcon fontSize="small" />
      ) : (
        <KeyboardArrowRightIcon fontSize="small" />
      )}
    </IconButton>
  );
};
