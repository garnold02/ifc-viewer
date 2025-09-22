import { IconButton, Tooltip } from "@mui/material";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import { useTranslation } from "react-i18next";
import { useToolbarStore } from "./store";
import { useCallback, useMemo } from "react";

export const ToolbarToggleSelectButton = () => {
  const { t } = useTranslation();
  const selectedTool = useToolbarStore((state) => state.selectedTool);
  const setSelectedTool = useToolbarStore((state) => state.setSelectedTool);

  const color = useMemo(
    () => (selectedTool === "select" ? "primary" : "default"),
    [selectedTool]
  );

  const onClick = useCallback(
    () => setSelectedTool(selectedTool === "select" ? null : "select"),
    [selectedTool, setSelectedTool]
  );

  return (
    <Tooltip title={t("component.toolbar.select")}>
      <IconButton size="small" color={color} onClick={onClick}>
        <PanToolAltIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
