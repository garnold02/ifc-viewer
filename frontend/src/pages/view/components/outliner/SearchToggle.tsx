import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const SearchToggle = ({ value, onChange }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.SearchToggle",
  });

  const title = useMemo(() => t(value ? "hide" : "show"), [t, value]);
  const onClick = useCallback(() => onChange(!value), [onChange, value]);
  const color = useMemo(() => (value ? "primary" : undefined), [value]);

  return (
    <Tooltip title={title}>
      <IconButton size="small" onClick={onClick}>
        <SearchIcon fontSize="small" color={color} />
      </IconButton>
    </Tooltip>
  );
};
