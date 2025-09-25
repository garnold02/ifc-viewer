import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useToolbarStore, type ToolName } from "./store";
import { useCallback, useMemo, type ReactNode } from "react";

type Props = {
  tool: ToolName;
  icon: ReactNode;
};

export const ToolbarToggleToolButton = ({ tool, icon }: Props) => {
  const { t } = useTranslation();
  const selectedTool = useToolbarStore((state) => state.selectedTool);
  const setSelectedTool = useToolbarStore((state) => state.setSelectedTool);

  const color = useMemo(
    () => (selectedTool === tool ? "primary" : "default"),
    [tool, selectedTool]
  );

  const onClick = useCallback(
    () => setSelectedTool(selectedTool === tool ? null : tool),
    [tool, selectedTool, setSelectedTool]
  );

  return (
    <Tooltip title={t(`component.toolbar.${tool}`)}>
      <IconButton size="small" color={color} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
