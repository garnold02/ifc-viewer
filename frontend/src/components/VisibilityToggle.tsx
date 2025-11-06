import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useCallback } from "react";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
};

export const VisibilityToggle = ({ value, onChange, disabled }: Props) => {
  const onClick = useCallback(() => onChange(!value), [onChange, value]);
  return (
    <IconButton size="small" onClick={onClick} disabled={disabled}>
      {value ? (
        <VisibilityIcon fontSize="small" />
      ) : (
        <VisibilityOffIcon fontSize="small" />
      )}
    </IconButton>
  );
};
