import { IconButton, Tooltip } from "@mui/material";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import { useTranslation } from "react-i18next";

export const ToolbarToggleSelectButton = () => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t("component.toolbar.select.enable")}>
      <IconButton size="small">
        <PanToolAltIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
