import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  variant: "self" | "children";
  value: boolean;
  onClick: () => void;
  disabled: boolean;
};

export const OutlinerVisibilityButton = ({
  variant,
  value,
  onClick,
  disabled,
}: Props) => {
  const { t } = useTranslation();
  const title = useMemo(
    () =>
      t(
        `components.Outliner.${value && !disabled ? "hide" : "show"}_${variant === "self" ? "self" : "children"}`
      ),
    [disabled, value, variant]
  );

  return (
    <Tooltip title={title}>
      <span>
        <IconButton size="small" onClick={onClick} disabled={disabled}>
          {value ? <VisibilityIcon fontSize="small" /> : null}
          {!value ? <VisibilityOffIcon fontSize="small" /> : null}
        </IconButton>
      </span>
    </Tooltip>
  );
};
